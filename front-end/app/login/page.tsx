import React, { useEffect, useState } from "react";
import Button from "../components/ui/button/page";
import axios from "axios";

interface UserProps {
  firstName: string;
  lastName: string;
}
