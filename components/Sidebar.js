import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator"
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) [
      // we need to add the chat into the DB collection
      db.collection('chats').add({
        users: [user.email, input]
      })
    ]
  }

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );


  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} />
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchWrapper>
          <SearchIcons />
          <SearchInput placeholder="Search or start new chat" />
        </SearchWrapper>
      </Search>
      <SidebarButton onClick={createChat}>start a new chat</SidebarButton>
      {
        chatsSnapshot?.docs.map((chat) => {
          return (
            <Chat key={chat.id} id={chat.id} users={chat.data().users} />
          )
        })
      }
    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
  background-color: #EDEDED;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div``;
const Search = styled.div`
  align-items: center;
  padding: 10px;
  border-radius: 2px;
  background: #f6f6f6;
`;


const SearchIcons = styled(SearchIcon)`
  margin-right: 20px;
  color: #919191;
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  background: white;
  flex: 1;
  font-size: 15px;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchWrapper = styled.div`
  background: white;
  display: flex;
  padding: 10px;
  border-radius: 50px;
`;
