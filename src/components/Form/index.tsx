import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { getPosts } from '../../store/ducks/Posts/actions';
import { UserState } from '../../store/ducks/User/types';



const Form = () => {

  const dispatch = useDispatch()

  const [show, setShow] = useState<boolean>(true)

  let inputImg = useRef<HTMLInputElement>(null)
  let inputDescription = useRef<HTMLInputElement>(null)

  // PQ ISSO NÃO FUNCIONA?
  // if (inputImg.current?.value === '') {
  //   setShow(false)
  // } else {
  //   setShow(true)
  // }

  const listPosts = () => {
    api.get(`/posts`)
      .then(response => dispatch(getPosts(response.data.reverse())))
  }

  const { name, username, userPicture } = useSelector((state: UserState) => state.user)

  const doPost = () => {

    const img = inputImg.current?.value
    const description = inputDescription.current?.value

    api.post(`/posts`, {
      user: name,
      nickName: username,
      userPicture: userPicture,
      postPicture: img,
      description: description,
      likes: 0
    })
    listPosts()

  }
  return (
      <div className="form">
        <p>Faça uma postagem aqui</p>
        <input type="text" placeholder="Cole a url da imagem" ref={inputImg}/>
        <input type="text" placeholder="Digite uma descrição" ref={inputDescription}/>
        {
          show
          ?
          <button onClick={doPost}>Postar!</button>
          :
          <button >BLOCK</button>
        }
      </div>
  );
}

export default Form;