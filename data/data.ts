import { Colors } from "@/constants/Colors";

export const analytics = [
  {
    id: "1",
    title: "Working days",
    value: "3",
    color: "secondary",
  },
  {
    id: "2",
    title: "Days with incomplete records",
    value: "1",
    color: "primary",
  },
  {
    id: "3",
    title: "Absent",
    value: "1",
    color: "secondary",
  },
  {
    id: "4",
    title: "No attendance required",
    value: "4",
    color: "primary",
  },
  {
    id: "5",
    title: "Days off",
    value: "2",
    color: "primary",
  },
  {
    id: "6",
    title: "Days on",
    value: "2",
    color: "secondary",
  },
  {
    id: "7",
    title: "Days off",
    value: "2",
    color: ["#0a7ea4"],
    day: "saturday",
  },
  {
    id: "8",
    title: "Days off",
    value: "2",
    color: ["#0a7ea4"],
  },
];

export const logs = [
  {
    id: "1",
    clockTitle: "Clock In",
    method: "app",
    clockDate: "21/02/2024",
    clockIn: "10:09:43",
    clockOut: "10:09:43",
    day: "Saturday",
  },
  {
    id: "2",
    clockTitle: "Clock Out",
    method: "web",
    clockDate: "21/02/20224",
    clockIn: "10:09:43",
    clockOut: "10:09:43",
    color: "primary",
  },
  {
    id: "3",
    clockTitle: "Clock In",
    method: "app",
    clockDate: "21/02/20224",
    clockIn: "10:09:43",
    clockOut: "10:09:43",
    day: "Sunday",
  },
  {
    id: "4",
    clockTitle: "Clock In",
    method: "app",
    clockDate: "21/02/20224",
    clockIn: "10:09:43",
    clockOut: "10:09:43",
    day: "Tuesday",
  },
  {
    id: "5",
    clockTitle: "Clock Out",
    method: "web",
    clockDate: "21/02/20224",
    clockIn: "10:09:43",
    clockOut: "--",
    day: "Monday",
  },
  {
    id: "6",
    clockTitle: "Clock In",
    method: "web",
    clockDate: "21/02/20224",
    clockTime: "10:09:43",
    day: "wednesday",
  },
  {
    id: "7",
    clockTitle: "Clock Out",
    method: "web",
    clockDate: "21/02/20224",
    clockTime: "10:09:43",
  },
  {
    id: "8",
    clockTitle: "Clock In",
    method: "app",
    clockDate: "21/02/20224",
    clockTime: "10:09:43",
  },
];

export const requestsData = [
  {
    id: "1",
    title: "All Requests",
    icon: "people",
  },
  {
    id: "2",
    title: "Overtime Requests",
    icon: "push",
  },
  {
    id: "3",
    title: "Missing Requests",
    icon: "share",
  },
  {
    id: "4",
    title: "Attendance Requests",
    icon: "shield-checkmark",
  },
  {
    id: "5",
    title: "Missing Requests",
    icon: "skull",
  },
];

export const data = [
  { id: "1", text: "Creating a new React Native project." },
  { id: "2", text: "Setting up the development environment." },
  { id: "3", text: "Building responsive layouts with Flexbox." },
  { id: "4", text: "Implementing state management in React Native apps." },
  { id: "5", text: "Adding and configuring React Navigation." },
  { id: "6", text: "Integrating third-party APIs for enhanced functionality." },
  { id: "7", text: "Handling user authentication and authorization." },
  { id: "8", text: "Using custom hooks to simplify code." },
  { id: "9", text: "Debugging and profiling React Native apps." },
  { id: "10", text: "Styling components with styled-components." },
  { id: "11", text: "Optimizing app performance and reducing load times." },
  { id: "12", text: "Configuring push notifications." },
  { id: "13", text: "Implementing offline support and data synchronization." },
  { id: "14", text: "Preparing the app for release." },
  { id: "15", text: "Submitting the app to Stores." },
];

export const allRequests = [
  {
    id: "1",
    title: "Overtime Requests",
    image: require("../assets/images/time.png"),
    icon: "add-circle-outline",
    href: "/overtimeRequest"
  },
  {
    id: "2",
    title: "Missing Requests",
    image: require("../assets/images/time2.png"),
    href: "/missingtimeRequest"
  },
  {
    id: "3",
    title: "Overtime Settings",
    image: require("../assets/images/time3.png"),
    href: "/overtimeRequest"
  },
  {
    id: "4",
    title: "Overtime Settings",
    image: require("../assets/images/time4.png"),
    href: "/overtimeRequest"
  },
  {
    id: "6",
    title: "Overtime Settings",
    image: require("../assets/images/time.png"),
  },
  {
    id: "7",
    title: "Overtime Settings",
    image: require("../assets/images/time4.png"),
  },
  {
    id: "8",
    title: "Overtime Settings",
    image: require("../assets/images/time2.png"),
  },
];
