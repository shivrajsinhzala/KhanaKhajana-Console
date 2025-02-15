"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "../context/AdminContext";
import DashboardOverview from "../../components/DashboardOverview";
import UpdatePlans from "../../components/UpdatePlans";
import RestaurantDetails from "../../components/RestaurantDetails";
import EditPlanModal from "../../components/EditPlanModal";
import { fetchWithAuth } from "../../app/utils/api";

export default function AdminPanel() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const router = useRouter();
  const { activeSection, restaurantDetails, setRestaurantDetails } = useAdmin();
  const [restroLoading, setRestroLoading] = useState(false);
  const [restroError, setRestroError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/login");
    } else {
      fetchPlans();
      fetchRestaurantDetails();
    }
  }, [router]);

  useEffect(() => {
    if (activeSection === "restaurantDetails") {
      fetchRestaurantDetails();
    }
  }, [activeSection]);

  const fetchPlans = async () => {
    try {
      const data = await fetchWithAuth(
        "https://khanakhajana-f7r6.onrender.com/plan/get-all-plans"
      );
      setPlans(data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  };

const handlePlanAction = async (planId, planData) => {
  const token = localStorage.getItem("adminToken");

  try {
    const method = planId === "new" ? "POST" : "PATCH";
    const url =
      method === "POST"
        ? "https://khanakhajana-f7r6.onrender.com/plan/create-plan" // ✅ Corrected URL
        : `https://khanakhajana-f7r6.onrender.com/plan/${planId}`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(planData),
    });

    // Log raw response before parsing
    const responseText = await response.text();
    

    try {
      const jsonResponse = JSON.parse(responseText);
      if (!response.ok) {
        throw new Error(jsonResponse.message || "Failed to save plan");
      }
    } catch (error) {
      console.error("Invalid JSON Response:", responseText);
      throw new Error("Invalid server response, expected JSON");
    }

    // Refresh plans after successful update
    await fetchPlans();
    setEditingPlan(null); // Close modal
  } catch (error) {
    console.error("Error saving plan:", error);
    alert(error.message || "Failed to save plan");
  }
};


const handleDeletePlan = async (planId) => {
  try {
    const response = await fetch(
      `https://khanakhajana-f7r6.onrender.com/plan/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        method: "DELETE",
      }
    );

    if (!response.ok){
      console.log(response)
      throw new Error("Failed to delete plan");
    } 

    // Update local state
    setPlans(plans.filter((plan) => plan._id !== planId));
    setEditingPlan(null); // Close modal
  } catch (error) {
    console.error("Delete error:", error);
    alert("Failed to delete plan");
  }
};
  const fetchRestaurantDetails = async () => {
    try {
      setRestroLoading(true);
      setRestroError("");

      console.log("Fetching restaurant details...");

      const response = await fetch(
        "https://khanakhajana-f7r6.onrender.com/admin/restro-admins",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      // Log raw response before parsing
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      const data = JSON.parse(responseText);
      console.log("Fetched restaurant details:", data); // ✅ Check API response

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format: Expected an array.");
      }

      setRestaurantDetails(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setRestroError(error.message);
    } finally {
      setRestroLoading(false);
    }
  };

  return (
    <>
      {activeSection === "dashboard" && (
        <DashboardOverview 
          loading={loading || restroLoading} 
          plans={plans}
          restaurantDetails={restaurantDetails}
        />
      )}
      {activeSection === "updatePlans" && (
        <UpdatePlans
          plans={plans}
          loading={loading}
          setEditingPlan={setEditingPlan}
        />
      )}
      {activeSection === "restaurantDetails" && (
        <RestaurantDetails
          restroLoading={restroLoading}
          restroError={restroError}
          restaurantDetails={restaurantDetails}
        />
      )}
      {editingPlan && (
        <EditPlanModal
          editingPlan={editingPlan}
          setEditingPlan={setEditingPlan}
          handlePlanAction={handlePlanAction} // Pass the handler
          onDeletePlan={handleDeletePlan}
        />
      )}
    </>
  );
}
