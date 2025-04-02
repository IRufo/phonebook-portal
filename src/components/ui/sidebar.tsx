import { verifyToken } from "../../services/authService";
import { List, Box, Icon, HStack, Avatar, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type Menu = {
    text?: string;
    icon: React.ElementType;
    onClick: Function
};

interface IMyProps {
    menus: Menu[],
}

const Sidebar: React.FC<IMyProps> = (props: IMyProps) => {
    const [{name, role}, setUser] = useState({name: '', role: ''})

    useEffect(() => {
        const getUser = async() => {
            const res = await verifyToken()
            const {data} = res
            const {first_name, last_name, role} = data || {}
            setUser({name: `${first_name} ${last_name}`, role})
        }
        getUser()
    },[])
    return (
        <Box
            width="240px"
            height="100%"
            borderRightWidth="1px"
            borderColor="gray.150"
            boxShadow="md"
        >
            <Box background='gray.100' p={2} borderBottomWidth="1px">
                <HStack gap="3">
                    <Avatar.Root size="md">
                        <Avatar.Fallback name={name} />
                        {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                    </Avatar.Root>
                    <Box>
                        <Text textStyle="md">{name}</Text>
                        <Text textStyle="xs" color="gray.500">{role}</Text>
                    </Box>
                </HStack>
            </Box>
            <List.Root listStyle="none" p="1">
                {props.menus.map((item) => (
                    <ListElement key={item.text} icon={item.icon} text={item.text} onClick={item.onClick} />
                ))}
            </List.Root>
        </Box>
    );
};

const ListElement = ({ icon, text, onClick }: Menu) => {
    return (
        <List.Item
            display="flex"
            pl="15px"
            alignItems="center"
            h="40px"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            rounded="md"
            onClick={() => onClick()}
        >
            <List.Indicator asChild>
                <Icon as={icon} />
            </List.Indicator>
            {text}
        </List.Item>
    );
};

export default Sidebar;
