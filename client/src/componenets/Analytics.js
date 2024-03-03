import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "emi",
    "medical",
    "fees",
    "tax",
  ];

  //total transaction calculation
  const totalTransactions = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalexpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransactions) * 100;
  const totalExpensePercent =
    (totalexpenseTransaction.length / totalTransactions) * 100;

  //total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTunoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div style={{ height: "calc(100vh - 100px)", overflowY: "auto" }}>
      <div className="row m-3">
        {/* First Column: Total Transaction and Total Turnover */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTransactions}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeTransaction.length}
              </h5>
              <h5 className="text-danger">
                Expense : {totalexpenseTransaction.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"green"}
                  percent={totalIncomePercent.toFixed(0)}
                />

                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"red"}
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">Total Turnover : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense : {totalExpenseTurnover}</h5>
              <div>
                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"green"}
                  percent={totalIncomeTunoverPercent.toFixed(0)}
                />

                <Progress
                  type="circle"
                  className="mx-2"
                  strokeColor={"red"}
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Column: Category-wise Content */}
        <div className="col-md-6">
          <div className="row mt-3">
            <div className="col-md-6">
              <h4>Category Wise Income</h4>
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "income" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="card">
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>

            <div className="col-md-6">
              <h4>Category Wise Expense</h4>
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="card">
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
