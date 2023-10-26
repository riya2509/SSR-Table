import "./App.css";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

const Table = styled.table`
  /* border: 1px solid black; */
  border-collapse: collapse;
  /* width: 100%; */
  height: 390px;
  overflow-y: auto;
  display: block;
`;
const TH = styled.th`
  border: 1px solid black;
  border-collapse: collapse;
  height: 30px;
`;
const TD = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
  padding: 5px;
  width: ${(props) => (props.$width ? props.$width : "auto")};
  height: 25px;
  /* background-color: #ebebeb; */
  background-color: ${(props) => (props.$isEven ? "#ebebeb" : "#fff")};
`;

const TruncateText = styled.div`
  white-space: nowrap;
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Button = styled.button`
  margin-top: 15px;
  margin-right: 15px;
  padding: 5px 10px;
  cursor: pointer;
`;
const PaginationBar = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: end; */
  align-items: center;
`;

const RowLabel = styled.label`
  margin-right: 10px;
  font-weight: 500;
`;

const RowSelect = styled.select`
  width: 75px;
  padding: 5px 10px;
  outline: none;
`;
const RowWrapper = styled.div`
  flex: 1;
`;
function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  // console.log(data);

  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);
  // const [column, setColumn] = useState();
  // const [order, setOrder] = useState();
  // const [value, setValue] = useState();
  // const [filter, setFilter] = useState();

  const fetchData = () => {
    axios
      .get("/test/data", {
        params: { row, page }, // column, order, value, filter
      })
      .then((response) => {
        setData(response?.data?.data);
        // console.log(response.data.total);
        setTotal(response?.data?.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const prev = () => {
    setPage(page - 1);
  };

  const next = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page, row]);
  // If dependency array is empty useEffect will be called only once .
  //  If dependency array is filled then it changes only on the change of those variables also gets called once when component mounts.

  console.log(page);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TH>Id</TH>
            <TH>Product</TH>
            <TH>Name</TH>
            <TH>Department</TH>
            <TH>Price</TH>
            <TH>Adjective</TH>
            <TH>Isbn</TH>
            <TH>Description</TH>
            <TH>Material</TH>
          </tr>
        </thead>
        <tbody>
          {data.map(
            (
              {
                id,
                product,
                name,
                department,
                price,
                adjective,
                isbn,
                description,
                material,
              },
              index
            ) => (
              <tr key={id}>
                <TD $width="2px" $isEven={index % 2 === 0}>
                  {id}
                </TD>
                <TD $width="2px" $isEven={index % 2 === 0}>
                  {product}
                </TD>
                <TD $width="200px" $isEven={index % 2 === 0}>
                  {name}
                </TD>
                <TD $width="90px" $isEven={index % 2 === 0}>
                  {department}
                </TD>
                <TD $width="40px" $isEven={index % 2 === 0}>
                  {price}
                </TD>
                <TD $width="5px" $isEven={index % 2 === 0}>
                  {adjective}
                </TD>
                <TD $width="150px" $isEven={index % 2 === 0}>
                  {isbn}
                </TD>
                <TD
                  $width="200px"
                  $isEven={index % 2 === 0}
                  title={description}
                >
                  <TruncateText>{description}</TruncateText>
                </TD>
                <TD $width="50px" $isEven={index % 2 === 0}>
                  {material}
                </TD>
              </tr>
            )
          )}
        </tbody>
      </Table>
      <PaginationBar>
        <RowWrapper>
          <RowLabel htmlFor="rows"> Rows</RowLabel>
          <RowSelect
            value={row}
            onChange={(e) => setRow(e.target.value)}
            name="rows"
          >
            <optgroup label="Choose a row-">
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </optgroup>
          </RowSelect>
        </RowWrapper>
        <Button disabled={page <= 1} onClick={() => setPage(1)}>
          First
        </Button>
        <Button disabled={page <= 1} onClick={prev}>
          Prev
        </Button>
        <Button disabled={page === total / 10} onClick={next}>
          Next
        </Button>
        <Button
          disabled={page === total / 10}
          onClick={() => setPage(total / 10)}
        >
          Last
        </Button>
      </PaginationBar>
    </>
  );
}

export default App;
