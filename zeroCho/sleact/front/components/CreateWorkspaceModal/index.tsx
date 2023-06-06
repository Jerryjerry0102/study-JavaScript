import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, SetStateAction, useCallback } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onCloseModal: MouseEventHandler;
}

const CreateWorkspaceModal: FC<Props> = ({ show, setShow, onCloseModal }) => {
  const { mutate } = useSWR<IUser | false>('/api/users', fetcher, { dedupingInterval: 1000000 });

  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const createWorkspace = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!newWorkspace || !newWorkspace.trim()) return;
      if (!newUrl || !newUrl.trim()) return;
      axios
        .post('/api/workspaces', { workspace: newWorkspace, url: newUrl })
        .then(() => {
          mutate();
          toast.success(`${newWorkspace} 워크스페이스 생성에 성공했습니다`);
          setShow(false);
          setNewWorkspace('');
          setNewUrl('');
        })
        .catch((err) => toast.error(err.response.data));
    },
    [newWorkspace, newUrl],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={createWorkspace}>
        <Label id="workspace-label">
          <span>워크스페이스 이름</span>
          <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
        </Label>
        <Label id="workspace-url-label">
          <span>워크스페이스 주소</span>
          <Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
