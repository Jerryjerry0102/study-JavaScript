import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel } from '@typings/db';
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

const CreateChannelModal: FC<Props> = ({ show, setShow, onCloseModal }) => {
  const [newChannel, onChangeNewChannel, setNewChannel] = useInput('');
  const { workspace } = useParams();

  const { mutate } = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher);

  const createChannel = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!newChannel || !newChannel.trim()) return;
      axios
        .post(`/api/workspaces/${workspace}/channels`, { name: newChannel })
        .then(() => {
          mutate();
          toast.success(`${newChannel} 채널 생성에 성공했습니다`);
          setShow(false);
          setNewChannel('');
        })
        .catch((err) => toast.error(err.response.data));
    },
    [newChannel],
  );

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={createChannel}>
        <Label id="channel-label">
          <span>채널 이름</span>
          <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
        </Label>
        <Button type="submit">생성하기</Button>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;
