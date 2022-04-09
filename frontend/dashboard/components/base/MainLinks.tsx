import type { NextPage } from "next";
import Link from "next/link";
import { User, UserCheck, List } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../app/store';
import { login } from "../../app/slices/loginSlice";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

const MainLink: NextPage<MainLinkProps> = ({ icon, color, label, href }) => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('Authorization'))
      dispatch(login());
  }, [dispatch]);

  return (
    <Link href={href} passHref>
      <UnstyledButton
        component="a"
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
};

export default MainLink;
export function MainLinks() {

  const isLogged = useSelector((state: RootState) => state.login.isLogged);

  const data = [
    {
      icon: <List size={16} />,
      color: "cyan",
      label: "Contests",
      href: "/",
    },
    {
      icon: ( isLogged ? <UserCheck size={16} /> : <User size={16} />),
      color: ( isLogged ? "green" : "red" ),
      label: "Account",
      href: "/account",
    },
  ];

  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
