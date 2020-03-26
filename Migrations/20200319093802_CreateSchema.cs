using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Bif4.SasanJaghori.EmployeeApp.Migrations
{
    public partial class CreateSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Firstname = table.Column<string>(nullable: true),
                    Lastname = table.Column<string>(nullable: true),
                    Dateofbirth = table.Column<DateTime>(nullable: false),
                    Hours = table.Column<int>(nullable: false),
                    Department = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeItems", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeItems");
        }
    }
}
