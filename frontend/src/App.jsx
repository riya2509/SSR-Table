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
  cursor: pointer;
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
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
`;
const PaginationBar = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: end; */
  align-items: center;
`;

const RowCountText = styled.div`
  margin-top: 20px;
  font-weight: bold;
`;

const RowLabel = styled.label`
  margin-right: 10px;
  font-weight: bold;
`;

const RowSelect = styled.select`
  width: 65px;
  padding: 5px 10px;
  outline: none;
`;

const ColumnSelect = styled.select`
  width: 105px;
`;
const RowWrapper = styled.div`
  flex: 1;
`;

const SearchBar = styled.input`
  width: 100px;
  margin-left: 20px;
`;

function App() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  // console.log(data);

  const [page, setPage] = useState(1);
  const [row, setRow] = useState(10);
  const [count, setCount] = useState(0);
  const [column, setColumn] = useState("id");
  const [order, setOrder] = useState(true);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("id");

  const fetchData = () => {
    axios
      .get("/test/data", {
        params: {
          row,
          page,
          column,
          order: order ? "asc" : "desc",
          value,
          filter,
        },
      })
      .then((response) => {
        setData(response?.data?.data);
        setTotal(response?.data?.total);
        setCount(response?.data?.count);
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
  }, [page, row, column, order, value]);
  // If dependency array is empty useEffect will be called only once .
  //  If dependency array is filled then it changes only on the change of those variables also gets called once when component mounts.

  const totalPage = Math.ceil(total / row);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <TH
              onClick={() => {
                setColumn("id");
                // setOrder((prev) => !prev);
                if (column === "id") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Id
            </TH>
            <TH
              onClick={() => {
                setColumn("product");
                if (column === "product") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Product
            </TH>
            <TH
              onClick={() => {
                setColumn("name");
                if (column === "name") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Name
            </TH>
            <TH
              onClick={() => {
                setColumn("department");
                if (column === "department") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Department
            </TH>
            <TH
              onClick={() => {
                setColumn("price");
                if (column === "price") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Price
            </TH>
            <TH
              onClick={() => {
                setColumn("adjective");
                if (column === "adjective") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Adjective
            </TH>
            <TH
              onClick={() => {
                setColumn("isbn");
                if (column === "isbn") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Isbn
            </TH>
            <TH
              onClick={() => {
                setColumn("description");
                if (column === "description") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Description
            </TH>
            <TH
              onClick={() => {
                setColumn("material");
                if (column === "material") {
                  setOrder((prev) => !prev);
                } else {
                  setOrder(true);
                }
              }}
            >
              Material
            </TH>
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
        <RowWrapper>
          <RowLabel htmlFor="filter"> Filter</RowLabel>
          <ColumnSelect
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            name="filters"
          >
            <optgroup label="Choose a filter-">
              <option value={"id"}>Id</option>
              <option value={"product"}>Product</option>
              <option value={"name"}>Name</option>
              <option value={"department"}>Department</option>
              <option value={"price"}>Price</option>
              <option value={"adjective"}>Adjective</option>
              <option value={"isbn"}>Isbn</option>
              <option value={"description"}>Description</option>
              <option value={"material"}>Material</option>
            </optgroup>
          </ColumnSelect>

          <SearchBar onChange={(e) => setValue(e.target.value)}></SearchBar>
        </RowWrapper>

        <RowCountText>
          {page === 1 ? 1 : (page - 1) * row + 1} to{" "}
          {count < row ? total : count * page} of {total}
        </RowCountText>
        <Button disabled={page <= 1} onClick={() => setPage(1)}>
          First
        </Button>
        <Button disabled={page <= 1} onClick={prev}>
          Prev
        </Button>
        <RowCountText>
          Page {page} of {totalPage}
        </RowCountText>
        <Button disabled={page === totalPage} onClick={next}>
          Next
        </Button>
        <Button
          disabled={page === totalPage}
          onClick={() => setPage(totalPage)}
        >
          Last
        </Button>
      </PaginationBar>
    </>
  );
}

export default App;
