import React, { useEffect, useState } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { Button } from 'react-bootstrap';
import { clone } from 'lodash';

import { AssessmentService } from '../../services/AssessmentService';
import { Checkbox } from '../../components/checkbox';

export const AssessmentList = () => {

  const [ assessments, setAssessments ] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: `ID`,
        accessor: `id`, // accessor is the "key" in the data
      },
      {
        Header: `Cat Name`,
        accessor: `cat_name`,
      },
      {
        Header: `Cat Date of Birth`,
        accessor: `cat_date_of_birth`,
      },
      {
        Header: `Risk Level`,
        accessor: `risk_level`,
      },
      {
        Header: `Score`,
        accessor: `score`,
      },
      {
        Header: `Created at`,
        accessor: `created_at`,

      },
    ],
    [],
  );

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    const fetchAssessments = async () => {
      setAssessments(await AssessmentService.getList());
    };
    fetchAssessments();
  }, []);

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: assessments,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(_columns => [
        {
          id: `selection`,
          Header: ({ getToggleAllRowsSelectedProps }) =>
            <Checkbox {...getToggleAllRowsSelectedProps()} />,
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ..._columns,
      ]);
    },
  );

  const onClick = async (ids) => {

    const status = await AssessmentService.delete(ids);

    const dlt = ids.Selected;

    let _assessments = clone(assessments);
    for (const id of dlt) {
      _assessments = _assessments.filter((assessment) => assessment.id !== id);
    }
    setAssessments(_assessments);

  };

  return (
    <div>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map(headerGroup =>
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <th
                  {...column.getHeaderProps()}

                >
                  {column.render(`Header`)}

                </th>)}
            </tr>)}
        </thead>
        <tbody {...getTableBodyProps()}
        >
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  <td
                    {...cell.getCellProps()}

                  >
                    {cell.render(`Cell`)}
                  </td>)}
              </tr>
            );
          })}
        </tbody>

      </table>
      <Button
        onClick={() => onClick({ Selected: selectedFlatRows.map((row) => row.original.id) })}
        variant="primary"
      >
        Delete selected rows
      </Button>
      <hr />
    </div>
  );
};
