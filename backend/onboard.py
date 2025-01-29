# https://docs.finbox.in/session-flow/management.html#bankconnect-management
# for getting bank statement data
#
# OR
# 
# Using Open Banking APIs (Razorpay or Setu) 
# or Account Aggregators (AA)
# 
bank_data = {"assets":[{
    "Name": "SBI Savings Account",
    "Type": "Cash",
    "Value": "10000",
    "DateUpdated": "2020-01-01"
},
{"liabilities":[{
    "Name": "SBI Car Loan",
    "Type": "Loan",
    "Value": "500000",
    "DateUpdated": "2020-01-01"
}]}
]}

# MF Central for Mutual Fund Data
mf_data = {"assets":[{
    "Name": "Nippon India Large Cap Fund Direct Growth",
    "Type": "Mutual Fund",
    "Value": "54962",
    "DateUpdated": "2020-01-01",
    "Quantity": "124.34",
}, {
    "Name": "Axis Bluechip Fund Direct Growth",
    "Type": "Mutual Fund",
    "Value": "33515",
    "DateUpdated": "2020-01-01",
    "Quantity": "67.03",
}, {
    "Name": "ICICI Prudential Bluechip Fund Direct Growth",
    "Type": "Mutual Fund",
    "Value": "36742",
    "DateUpdated": "2020-01-01",
    "Quantity": "58.79",
}]
}