import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, SetStateAction, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onCloseModal: MouseEventHandler;
}

const InviteWorkspaceModal: FC<Props> = ({ show, setShow, onCloseModal }) => {
  const { workspace } = useParams();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { mutate: memberMutate } = useSWR(`/api/workspaces/${workspace}/members`, fetcher);

  const inviteMember = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) return;
      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember })
        .then(() => {
          toast.success(`${newMember} 초대에 성공했습니다`);
          setShow(false);
          setNewMember('');
          memberMutate();
        })
        .catch((err) => toast.error(err.response.data));
    },
    [newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={inviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="member" type="email" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
