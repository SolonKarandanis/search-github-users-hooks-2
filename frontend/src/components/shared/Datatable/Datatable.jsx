import React from "react";
import { useTable,useSortBy,useFilters, useGlobalFilter } from "react-table";
import styled from 'styled-components';

const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
  }) => {
    const count = preFilteredRows.length;
  
    return (
      <input
        value={filterValue || ""}
        onChange={e => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} records...`}
      />
    );
};

const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter
  }) => {
    const count = preGlobalFilteredRows && preGlobalFilteredRows.length;
  
    return (
      <span>
        Search:{" "}
        <input
          value={globalFilter || ""}
          onChange={e => {
            setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
          }}
          placeholder={`${count} records...`}
          style={{
            border: "0"
          }}
        />
      </span>
    );
};


const Datatable = ({ columns, data }) =>{

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
            return rows.filter(row => {
                const rowValue = row.values[id];
                return rowValue !== undefined
                    ? String(rowValue)
                        .toLowerCase()
                        .startsWith(String(filterValue).toLowerCase())
                    : true;
            });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
          Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter
    } = useTable({columns,data ,defaultColumn,filterTypes},useFilters,useGlobalFilter,useSortBy);

    

    return(
        <Wrapper>

        
        <table {...getTableProps()}>
            <thead>
                <tr>
                    <th colSpan={visibleColumns.length}
                        style={{
                        textAlign: "left"
                        }}>
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter} />
                    </th>
                </tr>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render("Header")}
                            <span>
                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                            
                            </span>
                        </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            // console.log(cell.render("Cell").props.value);
                            return cell.column.id === 'avatar_url'? (
                                <td {...cell.getCellProps()}>
                                    <img src={cell.render("Cell").props.value} alt=""/>
                                </td>
                            ): (
                                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                            )
                            ;
                        })}
                        </tr>
                    );
                })}
            </tbody>
            {/* <tfoot>
                {footerGroups.map(group =>(
                    <tr {...group.getFooterGroupProps()}>
                        {group.headers.map(column =>(
                            <td {...column.getFooterProps()}>
                                {column.render("Footer")}
                            </td>
                        ))}
                    </tr>
                ))}
            </tfoot> */}
        </table>
        </Wrapper>
    );
};

export default Datatable;

const Wrapper = styled.div`
img {
    height: 100%;
    width: 45px;
    border-radius: 50%;
    object-fit: cover;
}
`;
  