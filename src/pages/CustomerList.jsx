import React, { useState, useEffect } from "react";
import {
  UserRound, MoreVertical, MessageSquare, MapPin,
  Utensils, Coffee, Hotel, Plane, Clock, Wallet,
  Pencil, Trash2, CheckCircle, AlertCircle, Search,
  Filter, X, ChevronDown
} from "lucide-react";
import Loading from "../components/Loading";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "pending": return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400";
      default: return "bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-slate-400";
    }
  };

  const getStatusIcon = (status) =>
    status?.toLowerCase() === "active"
      ? <CheckCircle className="w-4 h-4 text-emerald-500" />
      : <AlertCircle className="w-4 h-4 text-amber-500" />;

  const handleEditClick = (customer) => console.log("Edit", customer);
  const handleDeleteClick = (id) => console.log("Delete ID:", id);
  const handleStatusClick = (id) => console.log("Toggle Status:", id);

  useEffect(() => {
    fetch("https://finalprojectbackend-five.vercel.app/api/Customers")
      .then((res) => res.json())
      .then((data) => { setCustomers(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      filterStatus === "all" || c.status?.toLowerCase() === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Customers
            </h2>
          
          </div>

         
        </div>

       
      </div>

      {/* Customer Cards */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
        {loading ? (
          <Loading
            className="flex items-center justify-center min-h-[30vh]"
            text="Fetching customers..."
          />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <UserRound className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium">No customers found</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        ) : (
          filtered.map((customer) => {
            const isExpanded = expandedCard === customer._id;
            return (
              <div
                key={customer._id}
                className="group bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 shadow-sm"
              >
                {/* Card Top Row - Always Visible */}
                <div
                  className="flex items-center gap-3 p-4 cursor-pointer"
                  onClick={() => setExpandedCard(isExpanded ? null : customer._id)}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/20 flex-shrink-0">
                    <UserRound className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>

                  {/* Name + Status */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white text-sm truncate">
                      {customer.name?.toUpperCase() || "N/A"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(customer.status)}`}>
                        {customer.status || "Unknown"}
                      </span>
                      {customer.address && (
                        <span className="text-xs text-slate-400 truncate hidden sm:block">
                          📍 {customer.address}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expand Icon */}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-100 dark:border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 mb-3">
                      <InfoRow icon={<MessageSquare />} label={`Age: ${customer.age || "N/A"}`} />
                      <InfoRow icon={<MapPin />} label={customer.address} />
                      <InfoRow icon={<Utensils />} label={customer.foods} />
                      <InfoRow icon={<Coffee />} label={customer.beverages} />
                      <InfoRow icon={<Hotel />} label={customer.hotels} />
                      <InfoRow icon={<Plane />} label={customer.mode_of_travel} />
                      <InfoRow icon={<Clock />} label={customer.duration} />
                      <InfoRow icon={<Wallet />} label={customer.budget} />
                    </div>

                    
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function InfoRow({ icon, label }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
      {React.cloneElement(icon, {
        className: "w-3.5 h-3.5 text-blue-500 dark:text-blue-400 flex-shrink-0",
        strokeWidth: 2.5,
      })}
      <span className="font-medium truncate">{label || "Not specified"}</span>
    </div>
  );
}