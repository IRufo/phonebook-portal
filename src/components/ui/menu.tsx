import { Tabs, Icon } from "@chakra-ui/react";
import { ReactNode } from "react";

type Tab = {
  icon: React.ElementType;
  text: string;
  key: string;
};

type Content = {
  tab: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  contents?: Content[];
  value: string;
  setValue: Function;
};

const Menu: React.FC<Props> = ({ tabs, contents, value, setValue }) => {
  return (
    <Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Trigger key={tab.key} value={tab.key}>
            <Icon size="sm" as={tab.icon} />
            {tab.text}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {(contents || []).map((c: Content) => (
        <Tabs.Content value={c.tab}>
          {c.content}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};

export default Menu;
