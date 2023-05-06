import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

interface Props {
  show: boolean;
  onCloseModal: MouseEventHandler;
  setShowInviteWorkspaceModal: Dispatch<boolean>;
  mutate: KeyedMutator<IUser[]>;
}

const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteWorkspaceModal, mutate }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const { workspace } = useParams();

  const onInviteMember = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // 필수값들 들어있는지 검사
      if (!newMember || !newMember.trim()) return;

      axios
        .post(`/api/workspaces/${workspace}/members`, { email: newMember })
        .then(() => {
          mutate(); // 강의에서는 여기서도 useSWR를 해주지만 나는 props로 받아와서 해보자
          setShowInviteWorkspaceModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
          toast.error(`${error.response.data}`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        });
    },
    [newMember],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>이메일</span>
          <Input id="newMember" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
};

export default InviteWorkspaceModal;
