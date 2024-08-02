'use client'
import React, { useEffect, useRef, useState, lazy, Suspense, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncCurrentUser } from '@/store/Actions/userActions'
import { useRouter } from 'next/navigation'
// import Peer from "simple-peer"
import socketIo from 'socket.io-client';
import dynamic from 'next/dynamic'
import BlankRight from '@/components/BlankRight'
import LeftSkeleton from '@/components/skeletons/LeftSkeleton'
import RightSkeleton from '@/components/skeletons/RightSkeleton'
const Left = lazy(() => import('@/components/Left'))
const Right = lazy(() => import('@/components/Right'))
const Video = lazy(() => import('@/components/Video'))
const Audio = lazy(() => import('@/components/Audio'))
const NewChat = lazy(() => import('@/components/NewChat'))

const page = () => {
  const ENDPOINT = 'http://localhost:8080'
  const socket = useMemo(() => socketIo(ENDPOINT, { path: '/socket', transports: ['websocket'] }), []);

  const [user, setUser] = useState(useSelector(state => state.userReducers.user));
  const [friendArr, setFriendArr] = useState(user && user.friend);
  const [audio, setAudio] = useState(false);
  const [video, setVideo] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const [clickedId, setClickedId] = useState("");
  const [isOutgoingCall, setIsOutgoingCall] = useState(false); // incoming or outgoing call to send data to video component
  const [isGroupInfoStored, setIsGroupInfoStored] = useState(false);
  const [remotePeerId, setRemotePeerId] = useState("");
  const [isPeerAvailable, setIsPeerAvailable] = useState(null);
  const [callerContact, setCallerContact] = useState("");
  const remotePeer = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector(state => state.userReducers);

  // const callPeer = ()=> {
  //   const peerInstance = new Peer();
  // }

  useEffect(() => {
    if (isAuthenticated && !user) dispatch(asyncCurrentUser());
    if (!isAuthenticated) router.push("/");
    if (user) socket.emit("storeClientInfo", { contact: user.contact });
    if (!isGroupInfoStored) {
      let idArr = [];
      user && user.groups.map((e) => {
        idArr.push(e._id);
      })
      socket.emit("join-to-room", { rooms: idArr });
    }
    return () => socket.off("storeClientInfo");
  }, [isAuthenticated, socket.id])

  // useEffect(() => {

  //   if (!isPeerAvailable) {
  //     var peer = new Peer();
  //     peer.on('open', () => {
  //       setIsPeerAvailable(peer);
  //     })
  //   }

  //   socket.on('room-status', ({ res }) => setIsGroupInfoStored(res));

  //   socket.on('incoming-call', (caller) => {
  //     if (window.confirm(`${caller.callType} Call from ${caller.name}`)) {
  //       if (caller.callType === 'Video') setVideo(true);
  //       else setAudio(true);
  //       socket.emit('call-status', { peerId: isPeerAvailable.id, contact: caller.contact, name: user.name });
  //     } else socket.emit('call-status', { peerId: null, contact: caller.contact, name: user.name });
  //   })

  //   socket.on('call-status', (data) => {
  //     if (data.peerId) {
  //       setIsOutgoingCall(true);
  //       setRemotePeerId(data.peerId);
  //       remotePeer.current = data.peerId;
  //       setCallerContact(data.contact);
  //     }
  //     else {
  //       setVideo(false);
  //       setOnCall(false);
  //       toast.info(`call rejected by ${data.name}`);
  //     }
  //   })

  //   return () => {
  //     socket.off('incoming-call');
  //     socket.off('call-status');
  //     socket.off('room-status');
  //   }
  // }, [isPeerAvailable])


  return (
    <>
      <div className='flex relative overflow-hidden'>
        {newChat ?
          <Suspense fallback={<LeftSkeleton />}>
            <NewChat setFriendArr={setFriendArr} setNewChat={setNewChat} setClickedId={setClickedId} />
          </Suspense>
          :
          <Suspense fallback={<LeftSkeleton />}>
            <Left friendArr={friendArr} setNewChat={setNewChat} setClickedId={setClickedId} clickedId={clickedId} user={user} />
          </Suspense>
        }
        {clickedId ?
          <Suspense fallback={<RightSkeleton />}>
            <Right setVideo={setVideo} setAudio={setAudio} onCall={onCall} setOnCall={setOnCall} user={user} clickedId={clickedId} socket={socket} />
          </Suspense>
          : <BlankRight />}
        {video ?
          <Suspense fallback={<div>loading...</div>}>
            <Video setVideo={setVideo} setOnCall={setOnCall} peer={isPeerAvailable} isOutgoingCall={isOutgoingCall} setIsOutgoingCall={setIsOutgoingCall} remotePeerId={remotePeerId} socket={socket} callerContact={callerContact} />
          </Suspense>
          : ""}
        {audio ?
          <Suspense fallback={<div>loading...</div>}>
            <Audio setAudio={setAudio} setOnCall={setOnCall} />
          </Suspense>
          : ""}
      </div>
    </>
  )
}

export default page