using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QanShop.Migrations.QanShopDB
{
    /// <inheritdoc />
    public partial class UpdateTimeStore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "stores");

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TimeClose",
                table: "stores",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddColumn<TimeOnly>(
                name: "TimeOpen",
                table: "stores",
                type: "time",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeClose",
                table: "stores");

            migrationBuilder.DropColumn(
                name: "TimeOpen",
                table: "stores");

            migrationBuilder.AddColumn<DateTime>(
                name: "Time",
                table: "stores",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
