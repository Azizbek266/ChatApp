import React from "react";

const Emoji = ({ handleEmojiClick }) => {
  const emojis = [
    "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😒", 
    "😓", "😔", "😖", "😘", "😜", "😝", "😞", "😠", "😡", "😢", "😣", "😤", "😥", "😨", "😩", 
    "😪", "😫", "😭", "😰", "😱", "😲", "😳", "😴", "😷", "🥰", "🥳", "🤐", "🤒", "😄", "😅",
    "😆", "😉", "😊", "😋", "😌", "😍", "😎", "😏", "😒", "😓", "😔", "😖", "😘", "😜", "😝",
    "😞", "😠", "😡", "😢", "😣", "😤", "😥", "😨", "😩", "😪", "😫", "😭", "😰", "😱", "😲",
    "😳", "😴", "😷"
  ];

  return (
    <div className="emoji" style={{marginBottom:"25%"}} >
      <div className="emoji-container">
        {emojis.map((emoji, index) => (
          <span key={index} onClick={() => handleEmojiClick(emoji)} style={{margin:"10px"}}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Emoji;
