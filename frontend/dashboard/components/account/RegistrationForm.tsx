import {
    Box,
    Button,
    Group,
    LoadingOverlay,
    Modal,
    Paper,
    TextInput,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import type { NextPage } from "next";
  import { useState } from "react";
  import axios from "axios";
  import { API_URL } from "../../Constants";
  import { showNotification } from "@mantine/notifications";
import Link from "next/link";
  
  const RegistrationForm: NextPage = () => {
    const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);
  
    const submitRegistration = async (email: string, username: string, password: string) => {

      setLoginOverlayVisible(true);
      const result = await axios
        .post(`${API_URL}/auth/register`, {
          email: email,
          username: username,
          password: password,
        })
        .catch(() => {
          showNotification({
            title: "Registration Failed",
            color: "red",
            message:
              "There was an error while creating your account. It is possible that there is already an account using that email or username.",
          });
        });
      setLoginOverlayVisible(false);
      if (!result) return;
  
      showNotification({
        title: "Registration Success",
        color: "green",
        message: "You have successfully registred a new account. You can now login into your new account!",
      });
    };
  
    const form = useForm({
      initialValues: {
        email: "",
        username: "",
        password: "",
      },

      validate: {
          username: v => (v.length > 3 && v.length <= 20 ? null : 'Username should be between 3 and 20 characters long'),
          password: v => (v.length > 8 && v.length <= 30 ? null : 'Password should be between 8 and 30 characters long')
      }
    });
  
    return (
      <Box sx={{ maxWidth: 400 }} mx="auto">
        <div style={{ position: "relative" }}>
          <LoadingOverlay visible={loginOverlayVisible} />
          <Paper shadow="xs" p="md">
            <form
              onSubmit={form.onSubmit((values) =>
                submitRegistration(values.email, values.username, values.password)
              )}
            >
                <TextInput
                required
                label="Email"
                type="email"
                placeholder="admin@xstudios.one"
                {...form.getInputProps("email")}
              />
              <TextInput
                required
                label="Username"
                placeholder="admin"
                mt="md"
                {...form.getInputProps("username")}
              />
              <TextInput
                required
                label="Password"
                type="password"
                placeholder="admin123"
                {...form.getInputProps("password")}
                mt="md"
              />
  
              <Group position="right" mt="md">
                <Link href="/account" passHref><Button component="a" variant="subtle">Login</Button></Link>
                <Button type="submit">Create an account</Button>
              </Group>
            </form>
          </Paper>
        </div>
      </Box>
    );
  };
  
  export default RegistrationForm;
  