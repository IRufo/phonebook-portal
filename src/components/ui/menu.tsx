import { Tabs, Icon } from "@chakra-ui/react";

type Tab = {
  icon: React.ElementType;
  text: string;
  key: string;
};

type Props = {
  tabs: Tab[];
  value: string;
  setValue: Function;
};
const Menu: React.FC<Props> = ({ tabs, value, setValue }) => {
  return (
    <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.key} value={tab.key}>
            <Icon size="sm" as={tab.icon}/>
            {tab.text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export default Menu;
