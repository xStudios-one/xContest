import { Avatar, Button, Group, Paper, Text } from "@mantine/core";
import type { NextPage } from "next";
import { Logout } from "tabler-icons-react";
import Router from "next/router";

interface UserProps {
  username: string;
}

const UserCard: NextPage<UserProps> = ({ username }) => {
  return (
    <div>
      <Paper>
        <Group position="apart" p={8}>
          <Group>
            <Avatar color="random" radius="xl">
              {username.slice(0, 2).toUpperCase()}
            </Avatar>
            <Text weight={500} size="lg">
              {username}
            </Text>
          </Group>

          <Button
            variant="subtle"
            color="red"
            p={4}
            onClick={() => {
              localStorage.removeItem("Authorization");
              localStorage.removeItem("Username");
              Router.reload();
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
