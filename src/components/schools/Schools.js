import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Table, Form, Pagination, Button, Modal, Col } from 'react-bootstrap';
import NodeApi from '../../NodeApi';

class Schools extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      schools: [],
      tableSearch: "",
      pagination: {
        currentPage: 1,
        perPage: 10,
        total: 0,
        totalPages: 0
      },
      createModal: false,
      editModal: false,
      selectedSchool: {},
      createSchool: {
        name: ""
      }
    }
  }

  setSchools = (schools) => {
    this.setState({ schools: schools });
  }

  setTableSearch= (searchTerm) => {
    this.setState({ tableSearch: searchTerm });
  }

  setPagination = (pagination) => {
    this.setState({ pagination: pagination });
  }

  setCreateModal = (modal) => {
    this.setState({ createModal: modal });
  }

  setEditModal = (object, modal) => {
    this.setState({ selectedSchool: object});
    this.setState({ editModal: modal });
  }

  setCreateName = (name) => {
    this.setState({ createSchool: { name: name } });
  }

  setEditName = (name) => {
    this.setState({ selectedSchool: { _id: this.state.selectedSchool._id, name: name } });
  }

  loadTableData = async () => {
    const { data } = await NodeApi.get("/school?search="+this.state.tableSearch+"&page="+this.state.pagination.currentPage+"&size="+this.state.pagination.perPage);
    this.setSchools(data.items);
    const totalPages = Math.ceil(data.count / this.state.pagination.perPage);
    this.setPagination( { currentPage: this.state.pagination.currentPage, perPage: this.state.pagination.perPage, total: data.count, totalPages: totalPages });
  }

  componentDidMount = () => {
    this.loadTableData();
  }

  tableSearchSubmit = async (searchTerm) => {
    await this.setTableSearch(searchTerm);
    this.loadTableData();
  }

  submitCreateModal = async (event) => {
    event.preventDefault();

    try {
      await NodeApi.post("/school", this.state.createSchool);

      this.loadTableData();
      this.setCreateModal(false);
    } catch (e) {
      alert(e.message);
    }
  }

  submitEditModal = async (event) => {
    event.preventDefault();

    try {
      await NodeApi.put("/school/"+this.state.selectedSchool._id, { name: this.state.selectedSchool.name });

      this.loadTableData();
      this.setEditModal({}, false);
    } catch (e) {
      alert(e.message);
    }
  }

  handlePaginationChange = async (change) => {
    let newPage = this.state.pagination.currentPage;

    if(change === "prev") {
      newPage = this.state.pagination.currentPage-1;
    } else if(change === "next") {
      newPage = this.state.pagination.currentPage+1;
    } else {
      newPage = change;
    }

    await this.setPagination( { currentPage: newPage, perPage: this.state.pagination.perPage, total: this.state.pagination.total, totalPages: this.state.pagination.totalPages });
    this.loadTableData();
  }

  renderPagination = () => {
    let items = [];

    items.push(<Pagination.Prev 
      key={0}
      disabled={this.state.pagination.currentPage === 1}
      onClick={(e) => this.handlePaginationChange("prev")} />)

    for (let number = 1; number <= this.state.pagination.totalPages; number++) {
      items.push(
        <Pagination.Item key={number}
          active={number === this.state.pagination.currentPage}
          onClick={(e) => this.handlePaginationChange(number)}>
          {number}
        </Pagination.Item>
      );
    }

    items.push(<Pagination.Next 
        key={-1}
        disabled={this.state.pagination.currentPage === this.state.pagination.totalPages}
        onClick={(e) => this.handlePaginationChange("next")}/>)

    return(
        <Pagination>{items}</Pagination>
    );
  }

  renderCreateModal = () => {
    return (
      <>
        <Modal show={this.state.createModal} onHide={(e) => this.setCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create School</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="createForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={e => this.setCreateName(e.target.value)} />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => this.setCreateModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => this.submitCreateModal(e)}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  renderEditModal = () => {
    return (
      <>
        <Modal show={this.state.editModal} onHide={(e) => this.setEditModal({}, false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit School</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="editForm._id">
              <Form.Label>ID</Form.Label>
              <Form.Control plaintext readOnly defaultValue={this.state.selectedSchool._id} />
            </Form.Group>
            <Form.Group controlId="editForm.name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue={this.state.selectedSchool.name} onChange={e => this.setEditName(e.target.value)} />
            </Form.Group>
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={(e) => this.setEditModal({}, false)}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => this.submitEditModal(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
          <h1>Schools - <Button onClick={(e) => this.setCreateModal(true)}>Create</Button></h1>
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <Form>
              <Form.Group controlId="searchForm.name">
                <Form.Control type="text" placeholder="Search"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.tableSearchSubmit(e.target.value);
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col sm={8}></Col>
          <Col sm={2}>
            {this.renderPagination()}
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped hover bordered>
              <thead>
                <tr>
                  <th sm={3}>ID</th>
                  <th sm={9}>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.schools.map((object, i) => {
                  return (
                    <tr key={i} onClick={(e) => this.setEditModal(object, true)}>
                      <td sm={3}>{object._id}</td>
                      <td sm={9}>{object.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {this.renderEditModal()}
            {this.renderCreateModal()}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(Schools);