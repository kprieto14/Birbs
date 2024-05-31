using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Birbs.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoURLToBird : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoURL",
                table: "Birds",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoURL",
                table: "Birds");
        }
    }
}
