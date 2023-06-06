import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, SetStateAction, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onCloseModal: MouseEventHandler;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const InviteChannelModal: FC<Props> = ({ show, onCloseModal, setShow }) => {
  const { workspace, channel } = useParams();

  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const inviteMember = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) return;
      axios
        .post(`/api/workspaces/${workspace}/channels/${channel}/members`, { email: newMember })
        .then(() => {
          toast.success(`${newMember} 초대에 성공했습니다`);
          setShow(false);
          setNewMember('');
        })
        .catch((err) => toast.error(err.response.data));
    },
    [channel, newMember, setNewMember, setShow, workspace],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={inviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="newMember" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteChannelModal;
