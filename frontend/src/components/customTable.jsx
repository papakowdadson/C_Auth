import React, { useEffect } from "react";
import { Pagination, Table,Button } from "rsuite";
import { styled } from "styled-components";

import "rsuite/dist/rsuite-no-reset.min.css";

const { Column, HeaderCell, Cell } = Table;

export default function CustomTable({ data,myFunction,loading,actionText,localTracker }) {
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };


  const newData = data.filter((_,i) => {
    const start = limit * (page - 1);
    const end = start + limit;
    return i >= start && i < end;
  });

  let currentWidth =window.innerWidth<450?Math.floor(window.innerWidth*0.9): Math.floor(window.innerWidth*0.7);
  console.log('=======================width================')
  console.log('currentwidth',currentWidth);


  const ButtonCell = ({ rowData, dataKey, ...props }) =>(
    <Cell {...props}>
      <Button onClick={()=>myFunction(rowData[dataKey])} appearance="primary" color={localTracker.some((item)=>item==rowData[dataKey])?"blue":'red'}>{actionText=='Review'?`${localTracker.some((item)=>item==rowData[dataKey])?'Reviewed':'Review'}`:`${localTracker.some((item)=>item==rowData[dataKey])?'Approved':'Approve'}`}</Button>
    </Cell>
  );

  return (
    <TableWrapper>
      <Table height={460} data={newData} width={currentWidth} loading={loading} compact={true}>
        <Column minWidth={150} flexGrow={2} align="left" fullText={true}>
          <HeaderCell>Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column minWidth={80} flexGrow={1} align="left" fullText={true}>
          <HeaderCell>Company</HeaderCell>
          <Cell dataKey="company" />
        </Column>

        <Column minWidth={70} flexGrow={1} align="left">
          <HeaderCell>Action</HeaderCell>
          <ButtonCell dataKey='id' />
        </Column>

      </Table>
      <div style={{ padding: 20, width: "100%" }}>
        <Pagination
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          maxButtons={5}
          size="xs"
          layout={["total", "-", "limit", "|", "pager", "skip"]}
          total={data.length}
          limitOptions={[20, 30, 50]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </TableWrapper>
  );
}

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
 width:fit-content
`;
