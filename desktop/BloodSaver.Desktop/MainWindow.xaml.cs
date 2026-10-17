using System.Collections.Generic;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;

namespace BloodSaver.Desktop;

public partial class MainWindow : Window
{
    private readonly Button[] _navigationButtons;

    public MainWindow()
    {
        InitializeComponent();

        _navigationButtons =
        [
            DashboardNav,
            SyncNav,
            OrganizationsNav,
            SettingsNav
        ];

        ShowDashboard();
    }

    private void Dashboard_Click(object sender, RoutedEventArgs e) => ShowDashboard();

    private void Sync_Click(object sender, RoutedEventArgs e)
    {
        SetPage(
            "OPERATIONS",
            "Sync Center",
            "A dedicated place for connection state, pending operations, retries, and conflict review.",
            "Synchronization is not implemented",
            "This foundation does not connect to a server or synchronize data. The sync engine will be introduced in a later, separately verified milestone.",
            [
                "Backend connection: not configured",
                "Pending queue: not implemented",
                "Conflict resolution: not implemented"
            ],
            SyncNav);
    }

    private void Organizations_Click(object sender, RoutedEventArgs e)
    {
        SetPage(
            "ADMINISTRATION",
            "Organizations",
            "Organization and facility management will be added after the initial domain model is approved.",
            "No organization data is loaded",
            "This page is a navigation placeholder. It does not create, read, or modify organization records.",
            [
                "Organization hierarchy: planned",
                "Facility types: planned",
                "No organization records are stored by this shell"
            ],
            OrganizationsNav);
    }

    private void Settings_Click(object sender, RoutedEventArgs e)
    {
        SetPage(
            "CONFIGURATION",
            "Settings",
            "Deployment connection settings and local-device policies will be introduced in later milestones.",
            "Settings are not configured",
            "No server endpoint, credential, encryption key, or organization setting is collected or stored by this foundation screen.",
            [
                "Backend endpoint: not configured",
                "Local encrypted storage: not implemented",
                "Device authorization: not implemented"
            ],
            SettingsNav);
    }

    private void ShowDashboard()
    {
        SetPage(
            "OVERVIEW",
            "Desktop foundation",
            "A separate Windows client foundation. Existing web functionality has not been changed.",
            "Foundation only",
            "This milestone establishes the native Windows shell and navigation. Features will be added incrementally after individual checkpoints.",
            [
                "Native WPF project and navigation shell added",
                "Existing web API and database tables untouched",
                "Backend, login, local cache, and synchronization not connected"
            ],
            DashboardNav);
    }

    private void SetPage(
        string eyebrow,
        string title,
        string description,
        string panelTitle,
        string panelBody,
        IEnumerable<string> statusItems,
        Button activeNavigationButton)
    {
        PageEyebrow.Text = eyebrow;
        PageTitle.Text = title;
        PageDescription.Text = description;
        PanelTitle.Text = panelTitle;
        PanelBody.Text = panelBody;
        StatusItems.ItemsSource = statusItems;

        foreach (var button in _navigationButtons)
        {
            button.Background = Brushes.Transparent;
            button.Foreground = (Brush)FindResource("InkBrush");
        }

        activeNavigationButton.Background = (Brush)FindResource("AccentBrush");
        activeNavigationButton.Foreground = Brushes.White;
    }
}
