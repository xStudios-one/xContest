import React, { useState } from 'react';
import { Group, ActionIcon, useMantineColorScheme, Box, Modal, Text, Button } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

export function Brand() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [modalOpened, setModalOpened] = useState(false);

    function toggleColors() {
        if (colorScheme == "dark") setModalOpened(true);
        else toggleColorScheme();
    }

    return (<>
        <Modal opened={modalOpened} onClose={() => setModalOpened(false)} withCloseButton={false}>
            <Text size="md" weight={700}>Flash warning</Text>
            <Text py={10}>switching to eye burning mode may cause temporary blindness and/or vision problems in the future. <br /> Are you absolutely sure you want to switch?</Text>
            <Group position="center" grow>
                <Button color="green" variant="outline" onClick={() => { toggleColorScheme(); setModalOpened(false); }}>Yes</Button>
                <Button color="red" onClick={() => setModalOpened(false)}>No</Button>
            </Group>
        </Modal>
        <Group position="apart">
            <p>xContest</p>
            {/* TODO: Insert logo here */}
            <ActionIcon variant="default" onClick={() => toggleColors()} size={30}>
                {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
            </ActionIcon>
        </Group>
    </>
    );
}