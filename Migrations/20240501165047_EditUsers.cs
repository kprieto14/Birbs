﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Birbs.Migrations
{
    /// <inheritdoc />
    public partial class EditUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Users",
                newName: "lastName");

            migrationBuilder.AddColumn<string>(
                name: "firstName",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "firstName",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "Users",
                newName: "FullName");
        }
    }
}
