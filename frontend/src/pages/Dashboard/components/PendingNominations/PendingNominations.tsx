import React, { useState } from "react";
import { UserPlus, Check, X, Clock, Search } from "lucide-react";
import { Button } from "../../../../components/Button/Button";
import "./PendingNominations.css";

interface Nomination {
  id: string;
  reviewee: {
    name: string;
    avatar: string;
    department: string;
    role: string;
  };
  dueDate: string;
  status: "pending" | "accepted" | "rejected";
}

interface Peer {
  id: string;
  name: string;
  avatar: string;
  department: string;
  role: string;
  isSelected: boolean;
}

export const PendingNominations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "send">("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPeers, setSelectedPeers] = useState<string[]>([]);

  const nominations: Nomination[] = [
    {
      id: "1",
      reviewee: {
        name: "John Doe",
        avatar:
          "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff",
        department: "Engineering",
        role: "Senior Developer",
      },
      dueDate: "2024-03-20",
      status: "pending",
    },
    {
      id: "2",
      reviewee: {
        name: "Jane Smith",
        avatar:
          "https://ui-avatars.com/api/?name=Jane+Smith&background=14b8a6&color=fff",
        department: "Design",
        role: "UI/UX Designer",
      },
      dueDate: "2024-03-22",
      status: "pending",
    },
  ];

  const availablePeers: Peer[] = [
    {
      id: "1",
      name: "Sarah Wilson",
      avatar:
        "https://ui-avatars.com/api/?name=Sarah+Wilson&background=8b5cf6&color=fff",
      department: "Engineering",
      role: "Full Stack Developer",
      isSelected: false,
    },
    {
      id: "2",
      name: "Mike Johnson",
      avatar:
        "https://ui-avatars.com/api/?name=Mike+Johnson&background=ec4899&color=fff",
      department: "Product",
      role: "Product Manager",
      isSelected: false,
    },
    {
      id: "3",
      name: "Emily Brown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "4",
      name: "Emily Crown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "5",
      name: "Mily Brown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "6",
      name: "Ily Rown",
      avatar:
        "https://ui-avatars.com/api/?name=Mmily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "7",
      name: "Emily Brown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "8",
      name: "Emily Crown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "9",
      name: "Emil Brow",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "10",
      name: "Hugh Jass",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "11",
      name: "Mike Roach",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "12",
      name: "Louis Brown",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
    {
      id: "13",
      name: "Emily Quill",
      avatar:
        "https://ui-avatars.com/api/?name=Emily+Brown&background=14b8a6&color=fff",
      department: "Design",
      role: "Senior Designer",
      isSelected: false,
    },
  ];

  const handleAccept = (id: string) => {
    console.log("Accept nomination:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject nomination:", id);
  };

  const handlePeerSelection = (peerId: string) => {
    setSelectedPeers((prev) =>
      prev.includes(peerId)
        ? prev.filter((id) => id !== peerId)
        : prev.length < 5
        ? [...prev, peerId]
        : prev
    );
  };

  const handleSendRequests = () => {
    console.log("Sending requests to:", selectedPeers);
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getDaysRemaining = (dateString: string) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredPeers = availablePeers.filter(
    (peer) =>
      peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peer.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pending-nominations">
      <div className="card-header">
        <div className="header-content">
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-indigo-500" />
            <h2 className="card-title">Peer Nominations</h2>
          </div>
        </div>
        <div className="tabs-container">
          <div className="tabs flex justify-center">
            <button
              className={`tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending Requests
              {nominations.length > 0 && (
                <span className="tab-badge">{nominations.length}</span>
              )}
            </button>
            <button
              className={`tab ${activeTab === "send" ? "active" : ""}`}
              onClick={() => setActiveTab("send")}
            >
              Send Requests
              {selectedPeers.length > 0 && (
                <span className="tab-badge">{selectedPeers.length}/5</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {activeTab === "pending" ? (
        <div className="nominations-list">
          {nominations.map((nomination) => {
            const daysRemaining = getDaysRemaining(nomination.dueDate);

            return (
              <div key={nomination.id} className="nomination-item">
                <div className="nomination-info">
                  <img
                    src={nomination.reviewee.avatar}
                    alt={nomination.reviewee.name}
                    className="nomination-avatar"
                  />
                  <div className="nomination-details">
                    <h3 className="nomination-name">
                      {nomination.reviewee.name}
                    </h3>
                    <div className="nomination-meta">
                      <span className="nomination-role">
                        {nomination.reviewee.role}
                      </span>
                      <span className="nomination-department">
                        {nomination.reviewee.department}
                      </span>
                    </div>
                    <div className="nomination-due-info">
                      <Clock className="h-4 w-4" />
                      <span className="due-date">
                        Due {formatDueDate(nomination.dueDate)}
                      </span>
                      <span
                        className={`days-remaining ${
                          daysRemaining <= 3 ? "urgent" : ""
                        }`}
                      >
                        {daysRemaining} days remaining
                      </span>
                    </div>
                  </div>
                </div>
                <div className="nomination-actions">
                  <button
                    onClick={() => handleAccept(nomination.id)}
                    className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    title="Accept Nomination"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(nomination.id)}
                    className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    title="Reject Nomination"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="send-requests">
          <div className="search-bar">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search peers by name, department, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="peers-list">
            {filteredPeers.map((peer) => (
              <div
                key={peer.id}
                className={`peer-item ${
                  selectedPeers.includes(peer.id) ? "selected" : ""
                } ${
                  selectedPeers.length >= 5 && !selectedPeers.includes(peer.id)
                    ? "not-selectable"
                    : ""
                }`}
                onClick={() => handlePeerSelection(peer.id)}
              >
                {selectedPeers.includes(peer.id) && (
                  <div className="selection-counter">
                    {selectedPeers.indexOf(peer.id) + 1}/5
                  </div>
                )}
                <div className="peer-info">
                  <img
                    src={peer.avatar}
                    alt={peer.name}
                    className="peer-avatar"
                  />
                  <div className="peer-details">
                    <h3 className="peer-name">{peer.name}</h3>
                    <div className="peer-meta">
                      <span className="peer-role">{peer.role}</span>
                      <span className="peer-department">{peer.department}</span>
                    </div>
                  </div>
                </div>
                <div className="selection-indicator">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
          {selectedPeers.length > 0 && (
            <div className="send-actions">
              <Button onClick={handleSendRequests} className="send-button">
                <UserPlus className="h-4 w-4" />
                <span>Send Review Requests ({selectedPeers.length}/5)</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
