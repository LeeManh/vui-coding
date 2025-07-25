import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { SortType } from "@/types/common.type";

interface SortTabsProps {
  value: SortType;
  onValueChange: (value: SortType) => void;
  className?: string;
}

const SortTabs = ({ value, onValueChange, className }: SortTabsProps) => {
  return (
    <Tabs value={value} onValueChange={(val) => onValueChange(val as SortType)}>
      <TabsList className={className}>
        <TabsTrigger value={SortType.NEW}>Latest</TabsTrigger>
        <TabsTrigger value={SortType.TOP}>Top</TabsTrigger>
        <TabsTrigger value={SortType.COMMUNITY}>Community</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SortTabs;
