## Packages
(none needed)

## Notes
API: GET /api/dashboard returns DashboardResponse validated via @shared/routes (api.dashboard.get.responses[200]).
No auth flows assumed; always include credentials: "include" on fetch for cookie compatibility.
SEO: Set document title + meta description on dashboard mount.
