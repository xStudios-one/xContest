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

interface LoginFormProps {
  onLogin: (token: string, username: string, email: string) => void;
}

const LoginForm: NextPage<LoginFormProps> = ({ onLogin }) => {
  const [loginOverlayVisible, setLoginOverlayVisible] = useState(false);
  const [tfaModalVisible, setTfaModalVisible] = useState(false);

  const submitLogin = async (username: string, password: string) => {
    if (username == "admin" && password == "admin123") {
      showNotification({
        title: "2FA",
        color: "yellow",
        message: "2FA code was sent to your email address",
      });
      setTfaModalVisible(true);
      return;
    }

    setLoginOverlayVisible(true);
    const result = await axios
      .post(`${API_URL}/auth/login`, {
        username: username,
        password: password,
      })
      .catch(() => {
        showNotification({
          title: "Login Failed",
          color: "red",
          message:
            "Login failed, check if your username and password are correct",
        });
      });
    setLoginOverlayVisible(false);
    if (!result) return;
    const response = result.data;

    localStorage.setItem("Authorization", response.access_token);
    localStorage.setItem("Username", username);
    localStorage.setItem("Email", response.email);
    onLogin(response.access_token, username, response.email);
    showNotification({
      title: "Login Success",
      color: "green",
      message: "You have successfully logged in",
    });
  };

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const tfaForm = useForm({
    initialValues: {
      tfa: "",
    },

    validate: {
      tfa: (value) => (/^\d{6}$/.test(value) ? null : "Invalid 2FA Code"),
    },
  });

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Modal
        opened={tfaModalVisible}
        onClose={() => setTfaModalVisible(false)}
        title="Two Factor Authentication"
      >
        <form
          onSubmit={tfaForm.onSubmit((values) => {
            showNotification({
              color: "default",
              title: "Not yet implemented",
              message: "This feature is not yet implemented",
            });
            setTfaModalVisible(false);
          })}
        >
          <TextInput
            required
            label="2FA Code"
            placeholder="123456"
            {...tfaForm.getInputProps("tfa")}
          />
          <Group position="right" mt={10}>
            <Button type="submit">Verify</Button>
          </Group>
        </form>
      </Modal>

      <div style={{ position: "relative" }}>
        <LoadingOverlay visible={loginOverlayVisible} />
        <Paper shadow="xs" p="md">
          <form
            onSubmit={form.onSubmit((values) =>
              submitLogin(values.username, values.password)
            )}
          >
            <TextInput
              required
              label="Username"
              placeholder="admin"
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
              <Link href="/register" passHref><Button component="a" variant="subtle">Sign up</Button></Link>
              <Button type="submit">Login</Button>
            </Group>
          </form>
        </Paper>
      </div>
    </Box>
  );
};

export default LoginForm;
