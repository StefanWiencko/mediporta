import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { getTagsData } from "@/services/stackexchange";
import { tagTableControlAtom } from "@/atoms/tags";
import { BasicTableData, Tag } from "@/types";
import TagsTableControl from "@/components/TagsTableControl";
import BasicTable from "@/components/BasicTable";

const tableStructure: { name: string; key: keyof Tag }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "count" },
  { name: "Required", key: "is_required" },
  { name: "Moderator Only", key: "is_moderator_only" },
  { name: "Synonyms", key: "has_synonyms" },
];

const TagsTable = () => {
  const [{ perPage, sort, order }] = useAtom(tagTableControlAtom);

  const useTagsData = (page: number) => {
    const { data, error, isSuccess, isPending } = useQuery({
      queryKey: ["tags", page, perPage, sort, order],
      queryFn: () =>
        getTagsData({
          page,
          perPage,
          sort,
          order,
        }),
    });

    return {
      data: data?.items,
      error,
      isSuccess,
      isPending,
      totalPages:
        data?.total !== undefined ? Math.ceil(data?.total / perPage) : 0,
    };
  };

  const columnAlign = (key: keyof BasicTableData) =>
    key === "name" || key === "count" ? "left" : "center";
  return (
    <>
      <TagsTableControl />
      <BasicTable
        query={useTagsData}
        perPage={perPage}
        columnAlign={columnAlign}
        tableStructure={tableStructure}
        minWidth={450}
      />
    </>
  );
};

export default TagsTable;
