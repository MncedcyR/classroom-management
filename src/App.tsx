import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";

import Dashboard from "@/pages/dashboard";
import { Layout } from "@/components/refine-ui/layout/layout";
import { BookOpen, Home } from "lucide-react";
import SubjectList from "@/pages/subjects/list";
import SubjectCreate from "@/pages/subjects/create";

function App() {
    return (
        <BrowserRouter>
            <RefineKbarProvider>
                <ThemeProvider>
                    <DevtoolsProvider>
                        <Refine
                            dataProvider={dataProvider}
                            notificationProvider={useNotificationProvider()}
                            routerProvider={routerProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                                projectId: "a58QNI-ECzMoI-luqIby",
                            }}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: { label: "Home", icon: <Home /> },
                                },
                                {
                                    name: "subjects", // ✅ fixed
                                    list: "/subjects",
                                    create: "/subjects/create",
                                    meta: { label: "Subjects", icon: <BookOpen /> },
                                },
                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Layout>
                                            <Outlet />
                                        </Layout>
                                    }
                                >
                                    <Route index element={<Dashboard />} />

                                    <Route path="subjects">
                                        <Route index element={<SubjectList />} />
                                        <Route path="create" element={<SubjectCreate />} />
                                    </Route>
                                </Route>
                            </Routes>

                            <Toaster />
                            <RefineKbar />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>

                        <DevtoolsPanel />
                    </DevtoolsProvider>
                </ThemeProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
