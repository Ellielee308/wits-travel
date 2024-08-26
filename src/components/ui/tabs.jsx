import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "./YourComponentFilePath";

const MyTabs = () => {
  return (
    <Tabs defaultValue="tab1">
      <TabsList className="my-tabs-list">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="my-tabs-content">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab2" className="my-tabs-content">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab3" className="my-tabs-content">
        Content for Tab 3
      </TabsContent>
    </Tabs>
  );
};

export default MyTabs;
