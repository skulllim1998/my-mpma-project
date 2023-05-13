import Service from "../models/service";
import Category from "../models/category";

export const SERVICES = [
  new Service(
    1,
    1,
    "name1",
    "description1",
    "price1",
    "category1",
    1,
    "created1",
    "updated1"
  ),
  new Service(
    2,
    2,
    "name2",
    "description2",
    "price2",
    "category2",
    2,
    "created2",
    "updated2"
  ),
  new Service(
    3,
    3,
    "name3",
    "description3",
    "price3",
    "category3",
    3,
    "created3",
    "updated3"
  ),
];

export const CATEGORIES = [
  new Category("c1", "Air Condition", "#f5428d", [
    "Air Condition Installation",
    "Air Condition Repair",
    "Air Condition Maintenance",
    "Air Condition Cleaning",
  ]),
  new Category("c2", "Car Repair", "#f54242", [
    "Engine repair",
    "Brake system repair",
    "Suspension repair",
    "Electrical system repair",
  ]),
  new Category("c3", "Car Wash", "#f5a442", [
    "Exterior car wash",
    "Interior car wash",
    "Hand car wash",
    "Detailing services",
  ]),
  new Category("c4", "Washing Machine", "#f5d142", [
    "Washing Machine Repair",
    "Washing Machine Installation",
    "Washing Machine Maintenance",
    "Washing Machine Part replacement",
  ]),
  new Category("c5", "Refrigerator", "#368dff", [
    "Refrigerator Repair",
    "Refrigerator Installation",
    "Refrigerator Maintenance",
    "Refrigerator Part replacement",
  ]),
  new Category("c6", "Toilet", "#41d95d", [
    "Toilet Repair",
    "Toilet Installation",
    "Toilet Maintenance",
    "Clog removal",
  ]),
  new Category("c7", "Locksmith", "#9eecff", [
    "Unlock service",
    "Installation lock",
    "Car locksmith",
    "Duplicating keys",
  ]),
];

export const BOOKINGS = [
  {
    id: 1,
    user_id: 1,
    service_id: 1,
    address: "address1",
    price: "price1",
    date: "date1",
    session: "session1",
    notes: "notes1",
    status: "status1",
    created_at: "created1",
    updated_at: "updated1",
  },
  {
    id: 2,
    user_id: 2,
    service_id: 2,
    address: "address2",
    price: "price2",
    date: "date2",
    session: "session2",
    notes: "notes2",
    status: "status2",
    created_at: "created2",
    updated_at: "updated2",
  },
  {
    id: 3,
    user_id: 3,
    service_id: 3,
    address: "address3",
    price: "price3",
    date: "date3",
    session: "session3",
    notes: "notes3",
    status: "status3",
    created_at: "created3",
    updated_at: "updated3",
  },
];
