import { AppAvatar } from '@components/styled/AppAvatar.styled';
import { Divider } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type infoType = {
  // id: string;
  name: string;
  image_url: string;
  createdAt: string;
  phone_number: string;
};

const User = () => {
  const router = useRouter();
  const id = router.query.id;
  // const idNum = parseInt(id);
  const [userInfo, setUserInfo] = useState<infoType>();

  const item = userInfo;

  useEffect(() => {
    if (!router.isReady) return;
    console.log('idNum', id);

    fetch(`/api/get-user?id=${id}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data?.info));
  }, [router.isReady]);

  useEffect(() => {
    console.log('userInfo : ', userInfo);
  }, [userInfo]);

  return (
    <>
      <AppAvatar src={userInfo?.image_url}>{userInfo?.name}</AppAvatar>
      {userInfo && (
        <>
          <p>{userInfo?.name}</p>
          <p>{userInfo?.phone_number}</p>
        </>
      )}
    </>
  );
};

export default User;
