import { ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import React from "react";

export default function PaginationComponent({ totalPages, setPage, page }) {
  return (
    <Pagination.Root
      marginTop={"20px"}
      count={totalPages}
      pageSize={1}
      page={page}
      onPageChange={(e) => setPage(e.page)}
    >
      <ButtonGroup variant="outline" color={"white"} size="sm">
        <Pagination.PrevTrigger asChild color={"white"}>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              color={"white"}
              variant={{ base: "outline", _selected: "solid" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild color={"white"}>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
}
