import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import './style.css'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import Sand from "../img/send.png";

const Input = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null)

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤔", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "😳", "🤪", "😵", "😷", "🤒", "🤕", "🤢", "🤮", "🥵", "🥶", "😇", "🤠", "🥳", "🥴", "🥺", "🤯", "🤫", "🤭", "🧐", "🤓", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "💩", "🙈", "🙉", "🙊", "💥", "💫", "💦", "💨", "🔥", "🌪️", "🌈", "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "⛈️", "🌩️", "❄️", "🌨️", "☃️", "⛄", "🌬️", "💧", "💦", "🌊", "🤙", "🤞", "🤟", "🤘", "🤚", "👋", "🤏", "👍", "👎", "👊", "✊", "🤛", "🤜", "🤚", "👌", "👈", "👉", "👆", "👇", "☝️", "✋", "🤚", "🖐️", "👋", "🤙", "💪", "🦾", "🦵", "🦿", "🦶", "👂", "👃", "🧠", "🦷", "🦴", "👀", "👁️", "👅", "👄", "👶", "🧒", "👦", "👧", "🧑", "👱", "👨", "🧔", "👴", "👵", "👲", "👳", "🧕", "👮", "👷", "💂", "🕵️", "👩‍🌾", "👨‍🌾", "👩‍🍳", "👨‍🍳", "👩‍🎓", "👨‍🎓", "👩‍🎤", "👨‍🎤", "👩‍🏫", "👨‍🏫", "👩‍🏭", "👨‍🏭", "👩‍💻", "👨‍💻", "👩‍💼", "👨‍💼", "👩‍🔧", "👨‍🔧", "👩‍🔬", "👨‍🔬", "👩‍🎨", "👨‍🎨", "👩‍🚒", "👨‍🚒", "👩‍✈️", "👨‍✈️", "👩‍🚀", "👨‍🚀", "👩‍⚖️", "👨‍⚖️", "👰", "🤵", "👸", "🤴", "🧝", "🧚", "🧞", "🧛", "🧟", "💃", "🕺", "👯", "👯‍♂️", "🕴️", "🎭", "🎨", "🎬", "🎤", "🎧", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "🧩", "♟️", "🎯", "🎳", "🎮", "🕹️", "🎰", "🕰️", "⏰", "⏱️", "⏲️", "🕰️", "🌍", "🌎", "🌏", "🌐", "🗺️", "🗾", "🧭", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️", "🏝️", "🏞️", "🏟️", "🏛️", "🏗️", "🧱", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙️", "🌄", "🌅", "🌆", "🌇", "🌉", "♨️", "🎠", "🎡", "🎢", "💈", "🎪", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇", "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔", "🚕", "🚖", "🚗", "🚘", "🚙", "🚚", "🚛", "🚜", "🏎️", "🏍️", "🛵", "🦽", "🦼", "🛴", "🚲", "🛹", "🛼", "🛬", "🛫", "✈️", "🛸", "🚀", "🛰️", "💺", "🛶", "🚤", "🛥️", "🛳️", "⛵", "🛫", "🛬", "🚁", "🚟", "🚠", "🚡", "🛬", "🛫", "🛰️", "🚀", "🚣", "🚤", "🛶", "🚤", "🛥️", "🛳️", "🛫", "🛬", "🛸", "🛩️", "🚁", "🚆", "🚇", "🚈", "🚊", "🚝", "🚞", "🚋", "🚞", "🐵", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "🐂", "🐃", "🐄", "🐷", "🐖", "🐗", "🐏", "🐑", "🐐", "🦙", "🦒", "🐘", "🦏", "🦛", "🐭", "🐁", "🐀", "🐹", "🐰", "🐇", "🐿️", "🦔", "🦇", "🐻", "🐨", "🐼", "🦥", "🦦", "🦨", "🦩", "🐾", "🦮", "🦥", "🦦", "🐍", "🐲", "🐉", "🦕", "🦖", "🐢", "🐊", "🐍‍", "🐲‍", "🦖‍", "🦕‍", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐢", "🦎", "🐍", "🐲", "🐉", "🌵", "🎄", "🌲", "🌳", "🌴", "🌱", "🌿", "☘️", "🍀", "🎍", "🍄", "🍅", "🍆", "🥑", "🥦", "🥒", "🌶️", "🌽", "🥕", "🥔", "🍠", "🥜", "🌰", "🍯", "🍞", "🥐", "🥖", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🥙", "🌮", "🌯", "🥗", "🥘", "🍲", "🥣", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🍡", "🥟", "🥠", "🥡", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🍼", "🍺", "🍻", "🥂", "🥃", "🥤", "🥢", "🍴", "🥄", "🔪", "🏺", "🌰", "🍱", "🍾", "🍶", "🧉", "🍾", "🍶", "🍺", "🍻", "🍹", "🍷", "🥤", "🧊", "🚒", "🚑", "🚓", "🚕", "🛴", "🛵", "🚲", "🚂", "🚆", "🚅", "🚀", "🛸", "🛰️", "🚁", "🛩️", "🛫", "🛬", "🛥️", "🚤", "🛳️", "⛴️", "🛴", "🚲", "🛹", "🛴", "🏎️", "🏍️", "🛵", "🛺", "🚜", "🚛", "🚚", "🚗", "🚙", "🚌", "🚎", "🏠", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "⛩️", "🗼", "🗽", "🕌", "🕍", "⛪", "🛕", "🛖", "🕋", "🛤️", "🛣️", "🗾", "🏞️", "🌅", "🌄", "🌇", "🌆", "🏙️", "🌃", "🌉", "🌁", "🌌", "🌠", "🎆", "🎇", "🌈", "🎨", "🖼️", "🎭", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎲", "🎮", "🕹️", "🎯", "🎳", "🎰", "🎲", "🧩", "♟️", "🎭", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🎥", "🎞️", "📽️", "📺", "🎙️", "🎚️", "🎛️", "🎡", "🎢", "🎠", "🏟️", "🎪", "🎫", "🎖️", "🏅", "🎗️", "🏆", "🥇", "🥈", "🥉", "🏵️", "🎖️", "🏰", "🛕", "🕍", "⛩️", "🏯", "🏟️", "🎢", "🎡", "🎠", "🚨", "🚔", "🚨", "🚔", "🚍", "🚐", "🚒", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🥝", "🍅", "🥑", "🥒", "🥕", "🌽", "🌶️", "🥔", "🍠", "🥜", "🍯", "🥐", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🥓", "🥩", "🍔", "🍟", "🍕", "🌭", "🥪", "🥙", "🌮", "🌯", "🥗", "🥘", "🍲", "🥣", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧃", "🧉", "🥢", "🍽️", "🍴", "🥄", "🔪", "🏺", "🧊", "🥤", "🍼", "🥛", "🥂", "🍺", "🍽️", "🍴", "🥄", "🔪", "🥢", "🏺", "🧊", "🔥", "🌪️", "🌊", "💧", "💦", "☂️", "☔", "❄️", "🌬️", "🌀", "🌁", "🌃", "🌄", "🌅", "🌆", "🌇", "🌉", "🌌", "🌠", "🎇", "🎆", "🌈", "🎭", "🎨", "🎼", "🎹", "🎤", "🎧", "🎬"]

  const handleSend = async () => {
    if (text !== "" || img !== null) {
      if (img) {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          (error) => { },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
            });
          }
        );
      } else {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
      }

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
      setShowEmojiPicker(false);
    }
  };

  document.onkeydown = function (e) {
    if (e.keyCode === 13) {
      handleSend();
      setText("");
      setImg(null);
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="input">
      {showEmojiPicker && (
        <div className="emoji-picker">
          {emojis.map((emoji) => (
            <span key={emoji} onClick={() => setText(text + emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}
      <button id="icons" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
      <input
        type="text"
        placeholder="Xabar yozing..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
</div>
);
};

export default Input;