import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import axios from 'axios';
import React, { Dispatch, FC, FormEvent, MouseEventHandler, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

interface Props {
  show: boolean;
  onCloseModal: MouseEventHandler;
  setShowCreateChannelModal: Dispatch<boolean>;
  mutate: any;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal, mutate }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace, channel } = useParams();

  const onCreateChannel = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // 필수값들 들어있는지 검사
      if (!newChannel || !newChannel.trim()) return;

      axios
        .post(`http://localhost:3095/api/workspaces/${workspace}/channels`, { name: newChannel })
        .then(() => {
          mutate(); // 강의에서는 여기서도 useSWR를 해주지만 나는 props로 받아와서 해보자
          setShowCreateChannelModal(false);
          setNewChannel('');
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
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="channel-label">
          <span>채널 이름</span>
          <Input id="newChannel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
