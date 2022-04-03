import {
    Box,
    Button,
    Group,
    Paper,
    Checkbox,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import type { NextPage } from "next";
  import { useState } from "react";
  import axios from "axios";
  import { API_URL } from "../../Constants";
  import { showNotification } from "@mantine/notifications";
  import Link from "next/link";
  
  interface JoinFormProps {
    onJoin: () => void;
    tag: string;
  }
  
  const JoinForm: NextPage<JoinFormProps> = ({ onJoin, tag }) => {
  
    const joinContest = async () => {
  
      const result = await axios
        .post(`${API_URL}/contests/join/${tag}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            },
        })
        .catch(() => {
          showNotification({
            title: "Error",
            color: "red",
            message:
              "There was an error while joining this contest, please try again later.",
          });
        });
      if (!result) return;

      onJoin();
      showNotification({
        title: "Success",
        color: "green",
        message: "You have successfully joined this contest",
      });
    };
  
    const form = useForm({
      initialValues: {
        tos: false,
      },
    });

    return (
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <div style={{ position: "relative" }}>
          <Paper shadow="xs" p="md">
            <form
              onSubmit={form.onSubmit((values) =>
                joinContest()
              )}
            >
              <Checkbox
                required
                label="I agree to this contest's Terms of Service"
                {...form.getInputProps("tos")}
              />
  
              <Group position="right" mt="md">
                <Button type="submit">Join</Button>
              </Group>
            </form>
          </Paper>
        </div>
      </Box>
    );
  };
  
  export default JoinForm;
  