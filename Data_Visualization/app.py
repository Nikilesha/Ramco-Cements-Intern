import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

st.set_page_config(page_title="📦 Mini Logistics Dashboard", layout="wide")
st.title("📦 Logistics Data Analytics (Compact View)")

uploaded_file = st.file_uploader("Upload an Excel file", type=["xlsx"])

if uploaded_file:
    df = pd.read_excel(uploaded_file)

    # Parse dates automatically
    for col in df.columns:
        if "date" in col.lower():
            try:
                df[col] = pd.to_datetime(df[col])
            except:
                pass

    st.markdown("### 🔍 Dataset Preview")
    st.dataframe(df.head())

    # Identify column types
    numeric_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
    date_col = next((col for col in df.columns if 'date' in col.lower()), None)
    region_col = 'Region' if 'Region' in df.columns else None

    # ---- Compact Visualizations ----

    # Row 1: Line + Bar
    col1, col2 = st.columns(2)

    with col1:
        if date_col and 'Delivery Cost' in df.columns:
            st.markdown("##### 📈 Delivery Cost Over Time")
            data = df[[date_col, 'Delivery Cost']].groupby(date_col).sum().reset_index()
            fig = px.line(data, x=date_col, y='Delivery Cost')
            fig.update_layout(height=250, margin=dict(l=0, r=0, t=30, b=0))
            st.plotly_chart(fig, use_container_width=True)

    with col2:
        if region_col:
            st.markdown("##### 📊 Deliveries by Region")
            data = df[region_col].value_counts().reset_index()
            data.columns = ['Region', 'Count']
            fig = px.bar(data, x='Region', y='Count', color='Region')
            fig.update_layout(height=250, margin=dict(l=0, r=0, t=30, b=0))
            st.plotly_chart(fig, use_container_width=True)

    # Row 2: Heatmap + Boxplot
    col3, col4 = st.columns(2)

    with col3:
        if len(numeric_cols) > 1:
            st.markdown("##### 📌 Correlation Heatmap")
            fig, ax = plt.subplots(figsize=(5, 3))
            sns.heatmap(df[numeric_cols].corr(), annot=True, cmap="coolwarm", ax=ax)
            st.pyplot(fig)

    with col4:
        if 'Delay (min)' in df.columns and region_col:
            st.markdown("##### 🧪 Delay by Region")
            fig, ax = plt.subplots(figsize=(5, 3))
            sns.boxplot(data=df, x=region_col, y='Delay (min)', ax=ax)
            st.pyplot(fig)

    # Row 3: Replaced Scatter with Fuel Efficiency
    if 'Distance (km)' in df.columns and 'Fuel (L)' in df.columns:
        df['Fuel Efficiency (km/L)'] = df['Distance (km)'] / df['Fuel (L)']

        st.markdown("##### ⚙️ Fuel Efficiency (km per L)")
        col5, col6 = st.columns(2)

        with col5:
            if 'Region' in df.columns:
                eff_by_region = df.groupby('Region')['Fuel Efficiency (km/L)'].mean().reset_index()
                fig = px.bar(eff_by_region, x='Region', y='Fuel Efficiency (km/L)', color='Region',
                             title="Avg. Fuel Efficiency by Region")
                fig.update_layout(height=250, margin=dict(l=0, r=0, t=30, b=0))
                st.plotly_chart(fig, use_container_width=True)

        with col6:
            if 'Driver' in df.columns:
                eff_by_driver = df.groupby('Driver')['Fuel Efficiency (km/L)'].mean().sort_values(ascending=True).reset_index()
                fig = px.bar(eff_by_driver, x='Driver', y='Fuel Efficiency (km/L)', color='Driver',
                             title="Avg. Fuel Efficiency by Driver")
                fig.update_layout(height=250, margin=dict(l=0, r=0, t=30, b=0))
                st.plotly_chart(fig, use_container_width=True)

else:
    st.info("📂 Please upload a valid Excel file with columns like Date, Region, Delivery Cost, Distance (km), Fuel (L), Delay (min), and Driver.")
