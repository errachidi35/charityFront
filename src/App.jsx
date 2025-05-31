import React from "react";
import './App.css';
import { Toaster } from "sonner";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Missions } from "./pages/Missions";
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Gallery } from "./pages/Gallery"
import { Login } from "./pages/Login"
import { Signup } from "./pages/Signup";
import { MissionsGrid } from "./components/Missions/MissionsGrid";
import { Donation } from "./pages/Donation";
import {PrivateRoute} from "./components/PrivateRoute";
import {Dashboard} from "./pages/admin/Dashboard";
import {MissionsAdmin} from "./pages/admin/Missions";
import {Membres} from "./pages/admin/Membres";
import {DonationsAdmin} from "./pages/admin/Donations";
import {ContactsAdmin} from "./pages/admin/Contacts";
import {BenevolesAdmin} from "./pages/admin/Benevoles";
import {DiscussionsAdmin} from "./pages/admin/Discussions";
import {ParticipationsAdmin} from "./pages/admin/Participations";
import { MyParticipations } from "./pages/MyParticipations"; // en haut
import { MissionDetails } from "./pages/MissionDetails"; // en haut
import { RequireMembre } from "./routes/RequireMembre"; // en haut
import { CreateMission } from "./pages/membre/CreateMission"; // en haut
import { BenevolesMissions } from "./pages/membre/BenevolesMissions";
import { ParticipationsMissions } from "./pages/membre/ParticipationsMissions"; // en haut
import { MesMissions } from "./pages/membre/MesMissions"; // en haut
import { MesMissionsTable } from "./pages/membre/MesMissionsTable"; // en haut


function App() {
  return (
    <Router>
      {/* ✅ Affiche les toasts animés partout */}
      <Toaster richColors position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<div>Page Not Found</div>}></Route>
        <Route path="/" element={<MissionsGrid />} />
        <Route path="/donate/:id" element={<Donation />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/missions" element={<MissionsAdmin />} />
        <Route path="/admin/membres" element={<Membres />} />
        <Route path="/admin/donations" element={<DonationsAdmin />} />
        <Route path="/admin/contacts" element={<ContactsAdmin />} />
        <Route path="/admin/benevoles" element={<BenevolesAdmin />} />
        <Route path="/admin/discussions" element={<DiscussionsAdmin />} />
        <Route path="/admin/participations" element={<ParticipationsAdmin />} />
        <Route path="/my-participations" element={<MyParticipations />} />
<Route path="/mission/:id" element={<MissionDetails />} />
<Route
          path="/createmission"
          element={
            <RequireMembre>
              <CreateMission />
            </RequireMembre>
          }
        />
        <Route path="/missions-table" element={<MesMissionsTable />} />

        <Route
  path="/mes-benevoles"
  element={
    <RequireMembre>
      <BenevolesMissions />
    </RequireMembre>
  }
/>
<Route
  path="/mes-participations"
  element={
    <RequireMembre>
      <ParticipationsMissions />
    </RequireMembre>
  }
/>
<Route path="/mesmissions" element={<MesMissions />} />

      </Routes>
    </Router>
  );
}

export default App;
