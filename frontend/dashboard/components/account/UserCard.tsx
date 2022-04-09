import { Avatar, Button, Group, Paper, Text, Stack } from "@mantine/core";
import type { NextPage } from "next";
import { Logout } from "tabler-icons-react";
import Router from "next/router";
import { logout } from '../../app/slices/loginSlice';
import { useDispatch } from "react-redux";
import { showNotification } from "@mantine/notifications";

interface UserProps {
  username: string;
  email: string;
}

const UserCard: NextPage<UserProps> = ({ username, email }) => {

  const dispatch = useDispatch();

  return (
    <div>
      <Paper>
        <Group position="apart" p={8}>
          <Group>
            <Avatar color="random" radius="xl">
              {username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Stack spacing={0}>
              <Text weight={500} size="lg">
                {username}
              </Text>
              <Text weight={400} size="sm" sx={(theme) => ({
                color: theme.colors.gray[7]
              })}>
                {email}
              </Text>
            </Stack>
          </Group>

          <Button
            variant="subtle"
            color="red"
            id="logout-button"
            p={4}
            onClick={() => {
              localStorage.removeItem("Authorization");
              localStorage.removeItem("Username");
              localStorage.removeItem("Email");
              
              dispatch(logout());
              showNotification({
                title: 'Success',
                color: 'green',
                message: 'You have logged out successfully'
              })
            }}
          >
            <Logout />
          </Button>
        </Group>
      </Paper>
    </div>
  );
};

export default UserCard;
