import React, { useState } from "react"; // Importing React and useState hook
import { BsEmojiSmileFill } from "react-icons/bs"; // Importing smiley icon from react-icons/bs
import { IoMdSend } from "react-icons/io"; // Importing send icon from react-icons/io
import styled from "styled-components"; // Importing styled-components library for styling
import Picker from "emoji-picker-react"; // Importing emoji picker component from emoji-picker-react library

export default function ChatInput({ handleSendMsg }) { // Defining ChatInput component
  const [msg, setMsg] = useState(""); // State for message input field
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for controlling emoji picker visibility

  const handleEmojiPickerhideShow = () => { // Function to toggle emoji picker visibility
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => { // Function to handle emoji selection
    let message = msg;
    message += emojiObject.emoji; // Appending selected emoji to the message
    setMsg(message); // Updating message state with the new emoji
  };

  const sendChat = (event) => { // Function to handle sending chat message
    event.preventDefault(); // Preventing default form submission behavior
    if (msg.length > 0) { // Checking if message is not empty
      handleSendMsg(msg); // Calling the handleSendMsg function passed as prop
      setMsg(""); // Clearing the message input field
    }
  };

  return (
    <Container> {/* Container for styling */}
      <div className="button-container"> {/* Container for emoji button */}
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} /> {/* Smiley icon to toggle emoji picker */}
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} {/* Emoji picker component */}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}> {/* Form for message input */}
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)} // Updating message state as user types
          value={msg} // Binding message state to input value
        />
        <button type="submit"> {/* Button to send message */}
          <IoMdSend /> {/* Send icon */}
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div` // Styled component for styling the container
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%; // Setting grid columns
  background-color: #080420; // Background color
  padding: 0 2rem; // Padding
  @media screen and (min-width: 720px) and (max-width: 1080px) { // Media query for responsive design
    padding: 0 1rem; // Adjusting padding for smaller screens
    gap: 1rem; // Gap between elements
  }
  .button-container { // Styling for button container
    display: flex;
    align-items: center;
    color: white; // Text color
    gap: 1rem; // Gap between elements
    .emoji { // Styling for emoji button
      position: relative;
      svg {
        font-size: 1.5rem; // Icon size
        color: #ffff00c8; // Icon color
        cursor: pointer; // Cursor style
      }
      .emoji-picker-react { // Styling for emoji picker container
        position: absolute;
        top: -350px; // Positioning emoji picker
        background-color: #080420; // Background color
        box-shadow: 0 5px 10px #9a86f3; // Box shadow
        border-color: #9a86f3; // Border color
        .emoji-scroll-wrapper::-webkit-scrollbar { // Styling for scrollbar
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories { // Styling for emoji categories
          button {
            filter: contrast(0); // Filter for contrast
          }
        }
        .emoji-search { // Styling for emoji search
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before { // Styling for emoji group
          background-color: #080420;
        }
      }
    }
  }
  .input-container { // Styling for input container
    width: 100%; // Width
    border-radius: 2rem; // Border radius
    display: flex;
    align-items: center;
    gap: 2rem; // Gap between elements
    background-color: #ffffff34; // Background color
    input { // Styling for input field
      width: 90%; // Width
      height: 60%; // Height
      background-color: transparent; // Background color
      color: white; // Text color
      border: none; // Removing border
      padding-left: 1rem; // Padding
      font-size: 1.2rem; // Font size

      &::selection { // Styling for selected text
        background-color: #9a86f3; // Background color
      }
      &:focus { // Styling for input focus
        outline: none; // Removing outline
      }
    }
    button { // Styling for send button
      padding: 0.3rem 2rem; // Padding
      border-radius: 2rem; // Border radius
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3; // Background color
      border: none; // Removing border
      @media screen and (min-width: 720px) and (max-width: 1080px) { // Media query for responsive design
        padding: 0.3rem 1rem; // Adjusting padding for smaller screens
        svg { // Styling for send icon
          font-size: 1rem; // Font size
        }
      }
      svg { // Styling for send icon
        font-size: 2rem; // Font size
        color: white; // Text color
      }
    }
  }
`;
