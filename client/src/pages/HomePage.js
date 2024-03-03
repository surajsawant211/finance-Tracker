import React, { useEffect, useState } from "react";
import Layout from "../componenets/Layout/Layout";
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import axios from "axios";
import Spinner from "../componenets/Spinner";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";
import Analytics from "../componenets/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModel, setshowModel] = useState(false);
  const [loading, setloading] = useState(false);
  const [allTransaction, setallTransaction] = useState([]);
  const [frequency, setfrequency] = useState("7");
  const [selectedDate, setselectedDate] = useState([]);
  const [type, settype] = useState("all");
  const [viewData, setviewData] = useState("table");
  const [editable, seteditable] = useState(null)




  const getallTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      const res = await axios.post("/transactions/get-transaction", {
        userid: user._id,
        frequency,
        selectedDate,
        type,
      });
      setloading(false);
      setallTransaction(res.data);
      console.log(res.data, "trans");
    } catch (error) {
      console.log(error);
      message.error("Error while fetching transaction");
    }
  };


  //useeffect
  useEffect(() => {
    const getallTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setloading(true);
        const res = await axios.post("/transactions/get-transaction", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setloading(false);
        setallTransaction(res.data);
        console.log(res.data, "trans");
      } catch (error) {
        console.log(error);
        message.error("Error while fetching transaction");
      }
    };
    getallTransactions();
  }, [frequency, selectedDate, type]);

  //tableData

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Actions",
      render:(text,record)=>(
        <div>
          <EditOutlined  onClick={()=> {
          seteditable(record)
          setshowModel(true)
          }}/>
          <DeleteOutlined className="mx-2" onClick={()=> handleDelete(record)}/>
        </div>
      ) 
    },
  ];



  //handle delete
  const handleDelete = async(record)=>{
    try {
      setloading(true)
      await axios.post("/transactions/delete-transaction", {
        transactionId:record._id
      })
      setloading(false)
      message.success("Record deleted")

      // Update state after deletion
    setallTransaction(prevState =>
      prevState.filter(item => item._id !== record._id)
    );

    } catch (error) {
      setloading(false);
      console.log(error)
      message.error("Unable to Delete");
    }
  }

  //get all trasactions

  const handleSubmit = async (values) => {
    debugger;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setloading(true);
      if(editable){
        await axios.post("/transactions/edit-transaction", {
          payload :{
            ...values,
            userid: user._id,
          },
          transactionId :editable._id
        });
        setloading(false)
        message.success("Transaction updated successfully");
      }else{
        await axios.post("/transactions/add-transaction", {
          ...values,
          userid: user._id,
        });
        message.success("Transaction added successfully");
      }
      setloading(false);
      setshowModel(false);
      seteditable(null)

      
    // Update state after addition or update
    getallTransactions()

    } catch (error) {
      setloading(false);
      message.error("Failed to Add Transaction");
    }
  };
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frquency</h6>

          <Select value={frequency} onChange={(values) => setfrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setselectedDate(values)}
            />
          )}
        </div>

        <div>
          <h6>Select Type</h6>

          <Select value={type} onChange={(values) => settype(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>

          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setselectedDate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${viewData === "table" ? 'active-icon':'inactive-icon'}` }
            onClick={() => setviewData("table")}
          />
          <AreaChartOutlined
             className={`mx-2 ${viewData === "analytics" ? 'active-icon':'inactive-icon'}` }
            onClick={() => setviewData("analytics")}
          />
        </div>
        <div className="btn btn-primary" onClick={() => setshowModel(true)}>
          Add New
        </div>
      </div>
      <div className="content">
        {viewData ==="table" ?( <Table columns={columns} dataSource={allTransaction} />)
         : (
        <Analytics allTransaction={allTransaction}/>) }
        
      </div>
      <Modal
        title={editable ? "Edit Transaction":"Add Transactions"}
        open={showModel}
        onCancel={() => setshowModel(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="emi">EMI's</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fees">Fees</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
