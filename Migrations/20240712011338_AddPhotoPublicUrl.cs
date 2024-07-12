using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Birbs.Migrations
{
    /// <inheritdoc />
    public partial class AddPhotoPublicUrl : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoPublicId",
                table: "Birds",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoPublicId",
                table: "Birds");
        }
    }
}
