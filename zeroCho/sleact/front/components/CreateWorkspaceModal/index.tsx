import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, useCallback } from 'react';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

interface Props {
  show: boolean;
  onCloseModal: MouseEventHandler;
  setShowCreateWorkspaceModal: Dispatch<boolean>;
  mutate: KeyedMutator<IUser | false>;
}

const CreateWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowCreateWorkspaceModal, mutate }) => {
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const onCreateWorkspace = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // 필수값들 들어있는지 검사
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;

      axios
        .post('/api/workspaces', { workspace: newWorkspace, url: newUrl })
        .then(() => {
          mutate();
          setShowCreateWorkspaceModal(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((error) => {
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
    [newWorkspace, newUrl],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateWorkspace}>
        <Label id="workspace-label">
          <span>워크스페이스 이름</span>
          <Input id="newWorkspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
        </Label>
        <Label id="workspace-url-label">
          <span>워크스페이스 url</span>
          <Input id="newUrl" value={newUrl} onChange={onChangeNewUrl} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
