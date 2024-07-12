using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Birbs.Migrations
{
    /// <inheritdoc />
    public partial class AddUserNameToBirdOftheDay : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "BirdsOfTheDay",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserName",
                table: "BirdsOfTheDay");
        }
    }
}
